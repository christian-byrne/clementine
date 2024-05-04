from pathlib import Path
import json
import datetime
import gzip
import shutil

from service_classes.enums.options import UpdateOption
from service_classes.static_utils.update import UpdateUtils
from service_classes.interfaces.interface_types import Record, Table
from service_classes.logging.log_ import plog

from typing import Any, Iterable, List, Tuple
from termcolor import colored


class DatabaseTable(Table):
    MAX_BACKUPS = 5
    MAX_COMPRESSED_BACKUPS = 100

    def __init__(self, table_path: Path, primary_key: str):
        self.path = table_path
        self.primary_key = primary_key
        plog(f"Loading Table: {table_path}")

        self.name = table_path.stem
        self.extension = table_path.suffix
        self.parent_dir = table_path.parent
        self.data = self.__load_data()
        self.backup_data = self.data.copy()
        self.changes = []

    def get_records(self) -> List[Record]:
        return self.data

    def iter(self) -> Iterable[Record]:
        for record in self.data:
            yield record

    def save(self, backup: bool = True) -> None:
        existing_backups = [
            f
            for f in self.parent_dir.iterdir()
            if f.suffix == self.extension and f.stem.endswith("_backup")
        ]
        date_str = datetime.datetime.now().strftime("%B%d%Y_%H%M")
        new_backup_filename = (
            self.parent_dir / f"{self.name}_{date_str}_backup{self.extension}"
        )

        if len(existing_backups) >= DatabaseTable.MAX_BACKUPS:
            # Compress the backups and delete the original
            for i in range(1, DatabaseTable.MAX_BACKUPS):
                with open(existing_backups[i], "rb") as f:
                    with gzip.open(existing_backups[i] + ".gz", "wb") as gzf:
                        shutil.copyfileobj(f, gzf)

                existing_backups[i].unlink()

        with open(new_backup_filename, "w") as f:
            json.dump(self.backup_data, f)

        with open(self.path, "w") as f:
            json.dump(self.data, f)

    def find(self, primary_key: Any) -> Record:
        return next(
            (record for record in self.data if record[self.primary_key] == primary_key),
            None,
        )

    def print_changes(self) -> None:
        print(f"\n{colored(str(len(self.changes)), 'light_yellow')} Changes Made\n")
        for change in self.changes:
            description, old_record, new_record = change
            if "Overwritten" in description:
                descrip_color = "light_red"
            elif (
                "New" in description or "Empty" in description or "Added" in description
            ):
                descrip_color = "light_green"
            else:
                descrip_color = "cyan"

            print(
                f"\n{new_record[self.primary_key]}:  {colored(description, descrip_color)}"
            )

            print(colored("\nOld Record:\n", "light_yellow"))
            for field, value in old_record.items():
                if field not in new_record:
                    print(f"{colored(field, 'red')}: {value}")
                elif value != new_record[field]:
                    print(f"{colored(field, 'yellow')}: {value}")
                else:
                    print(
                        f"{colored(field, 'white', attrs=['dark'])}: {colored(str(value), 'white', attrs=['dark'])}"
                    )
            print(colored("\nNew Record\n", "light_yellow"))
            for field, value in new_record.items():
                if field not in old_record:
                    print(f"{colored(field, 'green')}: {value}")
                elif value != old_record[field]:
                    print(f"{colored(field, 'yellow')}: {value}")
                else:
                    print(
                        f"{colored(field, 'white', attrs=['dark'])}: {colored(str(value), 'white')}"
                    )

    def flush_print_changes(self) -> List[Tuple[str, Record, Record]]:
        self.print_changes()
        changes = self.changes
        self.changes = []
        return changes

    def update(
        self,
        option: UpdateOption,
        new_records: List[Record],
        allow_duplicate_subfield_values: bool = True,
    ):
        for record in new_records:
            existing_record = next(
                (
                    rec
                    for rec in self.data
                    if rec[self.primary_key] == record[self.primary_key]
                ),
                None,
            )

            # Record Doesn't Exist
            if not existing_record:
                self.get_records().append(record)
                self.changes.append(("New Record", {}, record.copy()))
                continue

            # Record Exists
            if option == UpdateOption.RECORD_OVERWRITE:
                temp = existing_record.copy()
                self.get_records()[self.data.index(existing_record)] = record
                self.changes.append(
                    ("Overwritten Record", temp, existing_record.copy())
                )
            else:
                self.__subfield_update(
                    existing_record, record, option, allow_duplicate_subfield_values
                )

    def __subfield_update(
        self,
        existing_record: Record,
        record: Record,
        option: UpdateOption,
        allow_duplicates: bool,
    ) -> None:
        self.__subfield_add_empty(existing_record, record)
        if option in [
            UpdateOption.SUBFIELD_APPEND_OR_OVERWRITE,
            UpdateOption.SUBFIELD_APPEND_ONLY,
        ]:
            self.__subfield_append(
                existing_record,
                record,
                allow_duplicates,
                option == UpdateOption.SUBFIELD_APPEND_OR_OVERWRITE,
            )
        elif option == UpdateOption.SUBFIELD_OVERWRITE:
            self.__subfield_overwrite(existing_record, record)
        elif option in [
            UpdateOption.SUBFIELD_SYMM_DIFF_OR_OVERWRITE,
            UpdateOption.SUBFIELD_SYMM_DIFF_ONLY,
        ]:
            self.__subfield_symdiff(
                existing_record,
                record,
                allow_duplicates,
                option == UpdateOption.SUBFIELD_SYMM_DIFF_OR_OVERWRITE,
            )
        elif option == UpdateOption.SUBFIELD_INTERSECTION:
            self.__subfield_intersect(existing_record, record)

    def __subfield_add_empty(self, existing_record: Record, record: Record) -> None:
        temp = existing_record.copy()
        changed = UpdateUtils.add_empty_fields(
            existing_record, record, self.primary_key
        )
        if changed:
            self.changes.append(("Added Empty Fields", temp, existing_record.copy()))

    def __subfield_overwrite(self, existing_record: Record, record: Record) -> None:
        temp = existing_record.copy()
        changed = UpdateUtils.overwrite_all(existing_record, record, self.primary_key)
        if changed:
            self.changes.append(("Overwritten Record", temp, existing_record.copy()))

    def __subfield_append(
        self,
        existing_record: Record,
        record: Record,
        allow_duplicates: bool,
        overwrite: bool = False,
    ) -> None:
        temp = existing_record.copy()
        change_msg = ""
        changed = UpdateUtils.append_reference_types(
            existing_record,
            record,
            self.primary_key,
            allow_duplicates=allow_duplicates,
        )
        if changed:
            change_msg = "Appended Record Reference Types "
        if overwrite:
            changed_primitive = UpdateUtils.overwrite_primitive_types(
                existing_record, record, self.primary_key
            )
            if changed_primitive:
                change_msg += "Overwrote Primitive Types"
            changed = changed or changed_primitive
        if changed:
            self.changes.append((change_msg.strip(), temp, existing_record.copy()))

    def __subfield_symdiff(
        self,
        existing_record: Record,
        record: Record,
        allow_duplicates: bool,
        overwrite: bool = False,
    ) -> None:
        temp = existing_record.copy()
        changed = UpdateUtils.append_reference_types(
            existing_record,
            record,
            self.primary_key,
            allow_duplicates=allow_duplicates,
            dict_symm_diff=True,
        )
        if overwrite:
            changed = changed or UpdateUtils.overwrite_primitive_types(
                existing_record, record, self.primary_key
            )
        if changed:
            self.changes.append(
                (
                    "Updated Record Reference Types & Overwrote Primitive Types",
                    temp,
                    existing_record.copy(),
                )
            )

    def __subfield_intersect(self, existing_record: Record, record: Record) -> None:
        temp = existing_record.copy()
        changed = UpdateUtils.intersect_reference_types(
            existing_record, record, self.primary_key
        )
        if changed:
            self.changes.append(
                (
                    "Updated Record Reference Types with Old/New Value Intersection",
                    temp,
                    existing_record.copy(),
                )
            )

    def __load_data(self):
        with open(self.path, "r") as f:
            data = json.load(f)
        return data

    def __find_matches(self, selector: Any, operator: str) -> Table:
        def operate(existing_primary_key, selector_primary_key):
            if operator == "eq":
                return existing_primary_key == selector_primary_key
            elif operator == "ne":
                return existing_primary_key != selector_primary_key
            elif operator == "lt":
                return existing_primary_key < selector_primary_key
            elif operator == "le":
                return existing_primary_key <= selector_primary_key
            elif operator == "gt":
                return existing_primary_key > selector_primary_key
            elif operator == "ge":
                return existing_primary_key >= selector_primary_key

        new_data = [
            record
            for record in self.data
            if operate(record[self.primary_key], selector)
        ]
        res = DatabaseTable(self.path, self.primary_key)
        res.data = new_data
        return res

    def __getitem__(self, field_name: str):
        return [record[field_name] for record in self.data if field_name in record]

    def __eq__(self, primary_key_selector: Any) -> Table:
        return self.__find_matches(primary_key_selector, "eq")

    def __ne__(self, primary_key_selector: Any) -> Table:
        return self.__find_matches(primary_key_selector, "ne")

    def __lt__(self, primary_key_selector: Any) -> Table:
        return self.__find_matches(primary_key_selector, "lt")

    def __le__(self, primary_key_selector: Any) -> Table:
        return self.__find_matches(primary_key_selector, "le")

    def __gt__(self, primary_key_selector: Any) -> Table:
        return self.__find_matches(primary_key_selector, "gt")

    def __ge__(self, primary_key_selector: Any) -> Table:
        return self.__find_matches(primary_key_selector, "ge")

    def __len__(self) -> int:
        return len(self.data)

    def __str__(self) -> str:
        return f"DataBase Table: {self.name}"

    def __setitem__(self, primary_key: Any, record: Any) -> None:
        for i, rec in enumerate(self.data):
            if rec[self.primary_key] == primary_key:
                self.data[i] = record
                break

    def __delitem__(self, primary_key: Any) -> None:
        for i, rec in enumerate(self.data):
            if rec[self.primary_key] == primary_key:
                del self.data[i]
                break

    def __iter__(self) -> Iterable:
        return iter(self.data)

    def __contains__(self, primary_key: Any) -> bool:
        return any(rec[self.primary_key] == primary_key for rec in self.data)

    def __add__(self, other: Table) -> Table:
        return DatabaseTable(self.path, self.primary_key, self.data + other.data)
