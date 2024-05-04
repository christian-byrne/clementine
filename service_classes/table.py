from pathlib import Path
import json
from typing import Any, Iterable, List
from service_classes.enums.options import UpdateOption
from service_classes.static_utils.update import UpdateUtils
from service_classes.interfaces.interface_types import Record, Table

class DatabaseTable(Table):
    def __init__(self, table_path: Path, primary_key: str):
        self.path = table_path
        self.primary_key = primary_key

        self.name = table_path.stem
        self.extension = table_path.suffix
        self.parent_dir = table_path.parent
        self.data = self.__load_data()

    def get_records(self) -> List[Record]:
        return self.data

    def iter(self) -> Iterable[Record]:
        for record in self.data:
            yield record

    def save(self) -> None:
        with open(self.path, "w") as f:
            json.dump(self.data, f)

    def find(self, primary_key: Any) -> Record:
        return next(
            (record for record in self.data if record[self.primary_key] == primary_key),
            None,
        )

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
                continue

            # Record Exists
            if option == UpdateOption.RECORD_OVERWRITE:
                self.get_records()[self.data.index(existing_record)] = record
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
    ):
        UpdateUtils.add_empty_fields(existing_record, record, self.primary_key)

        if option in [
            UpdateOption.SUBFIELD_APPEND_OR_OVERWRITE,
            UpdateOption.SUBFIELD_APPEND_ONLY,
        ]:
            UpdateUtils.append_reference_types(
                existing_record,
                record,
                self.primary_key,
                allow_duplicates=allow_duplicates,
            )
            if option == UpdateOption.SUBFIELD_APPEND_OR_OVERWRITE:
                UpdateUtils.overwrite_primitive_types(
                    existing_record, record, self.primary_key
                )

        if option == UpdateOption.SUBFIELD_OVERWRITE:
            UpdateUtils.overwrite_all(existing_record, record, self.primary_key)

        if option in [
            UpdateOption.SUBFIELD_SYMM_DIFF_OR_OVERWRITE,
            UpdateOption.SUBFIELD_SYMM_DIFF_ONLY,
        ]:
            UpdateUtils.append_reference_types(
                existing_record,
                record,
                self.primary_key,
                allow_duplicates=allow_duplicates,
                dict_symm_diff=True,
            )
            if option == UpdateOption.SUBFIELD_SYMM_DIFF_OR_OVERWRITE:
                UpdateUtils.overwrite_primitive_types(
                    existing_record, record, self.primary_key
                )

        if option == UpdateOption.SUBFIELD_INTERSECTION:
            UpdateUtils.intersect_reference_types(
                existing_record, record, self.primary_key
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
        return DatabaseTable(self.path, self.primary_key, new_data)

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
        return f"{self.name}"

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
