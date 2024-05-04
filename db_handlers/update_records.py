import json
from pathlib import Path
from typing import Any, Dict, List
from enum import Enum


class UpdateOption(Enum):
    SUBFIELD_APPEND_OR_OVERWRITE = (
        "subfield_append_or_overwrite",
        "If the field exists in the existing record, append the new values to the existing values if it's a reference type (other than tuple); otherwise, overwrite the existing value with the new value",
    )
    SUBFIELD_APPEND_ONLY = (
        "subfield_append_only",
        "When a value has a subfield that already exists in the existing record, append the subfield value",
    )
    SUBFIELD_OVERWRITE = (
        "subfield_overwrite",
        "When a value has a subfield that already exists in the existing record, overwrite the subfield value",
    )
    SUBFIELD_SYMM_DIFF_OR_OVERWRITE = (
        "subfield_symm_diff_or_overwrite",
        "If a value has a subfield that already exists in the existing record: If it is a reference type, append the new subfield values to the existing subfield values and remove the existing subfield values that are in the new subfield values (symmetric difference). If it's a primitive type, overwrite the existing subfield value with the new subfield value",
    )
    SUBFIELD_INTERSECTION = (
        "subfield_intersection",
        "If a value has a subfield that already exists in the existing record, remove values which don't match the new record, leave the rest as is",
    )
    SUBFIELD_SYMM_DIFF_ONLY = (
        "subfield_symm_diff_only",
        "Symm diff, but ignore subfield values that are primitive types and are already in the existing subfield values",
    )
    EMPTY_SUBFIELDS_ONLY = (
        "empty_subfields_only",
        "If a value has a subfield that already exists in the existing record, only add values when the field doesn't exist in the existing record",
    )
    RECORD_OVERWRITE = (
        "record_overwrite",
        "If a record exists, simply overwrite it with the new record",
    )
    RECORD_APPEND_ONLY = (
        "record_append_only",
        "If a record with the same primary key exists, skip",
    )


class TableUpdater:
    def __init__(self, table_path: Path):
        self.table_path = table_path

    def __read_table_data(self) -> List[Dict[str, Any]]:
        with open(self.table_path, "r") as table_file:
            return json.load(table_file)

    def __write_table_data(self, table_data: List[Dict[str, Any]]) -> None:
        with open(self.table_path, "w") as table_file:
            json.dump(table_data, table_file, indent=4)

    def update_records(
        self,
        option: UpdateOption,
        new_records: List[Dict[str, Any]],
        primary_key: str,
        allow_duplicate_subfield_values: bool = True,
    ):
        table = self.__read_table_data()
        for record in new_records:
            record_id = record[primary_key]
            existing_record = next(
                (r for r in table if r[primary_key] == record_id), None
            )

            # Record Doesn't Exist
            if not existing_record:
                table.append(record)
                continue
            if option == UpdateOption.RECORD_APPEND_ONLY:
                continue

            # Record Exists
            if option == UpdateOption.RECORD_OVERWRITE:
                table[table.index(existing_record)] = record
                continue

            if option in [
                UpdateOption.SUBFIELD_APPEND_OR_OVERWRITE,
                UpdateOption.SUBFIELD_OVERWRITE,
                UpdateOption.SUBFIELD_SYMM_DIFF_OR_OVERWRITE,
                UpdateOption.SUBFIELD_SYMM_DIFF_ONLY,
                UpdateOption.SUBFIELD_INTERSECTION,
                UpdateOption.EMPTY_SUBFIELDS_ONLY,
                UpdateOption.SUBFIELD_APPEND_ONLY,
            ]:
                TableUpdater.add_empty_fields(existing_record, record, primary_key)

            if option in [
                UpdateOption.SUBFIELD_APPEND_OR_OVERWRITE,
                UpdateOption.SUBFIELD_APPEND_ONLY,
            ]:
                TableUpdater.append_reference_types(
                    existing_record,
                    record,
                    primary_key,
                    allow_duplicate_subfield_values,
                )
                if option == UpdateOption.SUBFIELD_APPEND_OR_OVERWRITE:
                    TableUpdater.overwrite_primitive_types(
                        existing_record, record, primary_key
                    )

            if option == UpdateOption.SUBFIELD_OVERWRITE:
                TableUpdater.overwrite_all(existing_record, record, primary_key)

            if option in [
                UpdateOption.SUBFIELD_SYMM_DIFF_OR_OVERWRITE,
                UpdateOption.SUBFIELD_SYMM_DIFF_ONLY,
            ]:
                TableUpdater.append_reference_types(
                    existing_record,
                    record,
                    primary_key,
                    allow_duplicate_subfield_values,
                    dict_symm_diff=True,
                )
                if option == UpdateOption.SUBFIELD_SYMM_DIFF_OR_OVERWRITE:
                    TableUpdater.overwrite_primitive_types(
                        existing_record, record, primary_key
                    )

            if option == UpdateOption.SUBFIELD_INTERSECTION:
                TableUpdater.intersect_reference_types(
                    existing_record, record, primary_key
                )

        self.__write_table_data(table)

    @staticmethod
    def add_empty_fields(existing_rec: dict, record: dict, primary_key: str):
        for field, value in record.items():
            if field != primary_key and field not in existing_rec:
                existing_rec[field] = value

    @staticmethod
    def overwrite_all(existing_rec: dict, record: dict, primary_key: str):
        for field, value in record.items():
            if field != primary_key:
                existing_rec[field] = value

    @staticmethod
    def overwrite_primitive_types(existing_rec: dict, record: dict, primary_key: str):
        for field, value in record.items():
            if field != primary_key and isinstance(
                value, (str, int, float, bool, complex, type(None))
            ):
                existing_rec[field] = value

    @staticmethod
    def overwrite_reference_types(existing_rec: dict, record: dict, primary_key: str):
        for field, value in record.items():
            if field != primary_key and not isinstance(
                value, (str, int, float, bool, complex, type(None))
            ):
                existing_rec[field] = value

    @staticmethod
    def intersect_reference_types(existing_rec: dict, record: dict, primary_key: str):
        remove = [field for field in existing_rec if field not in record]
        for field in remove:
            existing_rec.pop(field)
        TableUpdater.append_reference_types(existing_rec, record, primary_key)

    @staticmethod
    def append_reference_types(
        existing_rec: dict,
        record: dict,
        primary_key: str,
        allow_duplicates: bool = True,
        dict_symm_diff: bool = False,
    ):
        """
        Append the reference types of the new record to the existing record.

        Reference types include lists, sets, dictionaries, and custom classes.
        Append is not applicable to tuples because we can assume that each  index in the tuple is a separate sub-field

        Args:
            existing_record (dict): The existing record to append to.
            record (dict): The new record to append.
            primary_key (str): The primary key of the record.
        """
        for field, value in record.items():
            if field != primary_key:
                if isinstance(value, list):
                    existing_rec[field] = TableUpdater.append_list(
                        existing_rec.get(field, []), value, allow_duplicates
                    )
                elif isinstance(value, set):
                    existing_rec[field] = TableUpdater.append_set(
                        existing_rec.get(field, set()), value
                    )
                elif isinstance(value, dict):
                    if dict_symm_diff:
                        existing_rec[field] = TableUpdater.append_dict_symmetric_diff(
                            existing_rec.get(field, {}), value
                        )
                    else:
                        TableUpdater.append_reference_types(
                            existing_rec[field], value, primary_key, allow_duplicates
                        )

                elif not isinstance(
                    value, (str, int, float, bool, complex, type(None))
                ):
                    TableUpdater.append_custom_class(existing_rec[field], value)

    @staticmethod
    def append_custom_class(existing_object: object, new_object: object) -> bool:
        """
        Appends a new object to an existing object using the appropriate append equivalent method.

        Args:
          existing_object (object): The existing object to which the new object will be appended.
          new_object (object): The new object to be appended to the existing object.

        Returns:
          bool: True if the append was successful, False otherwise.
        """
        append_equivalent_methods = [
            "__append__",
            "__add__",
            "__push__",
            "__concat__",
            "__extend__",
            "__iadd__",
            "__ipush__",
            "__iconcat__",
            "__iextend__",
            "__radd__",
            "__rpush__",
        ]
        if any(
            hasattr(existing_object, method) for method in append_equivalent_methods
        ):
            method_name = next(
                method
                for method in append_equivalent_methods
                if hasattr(existing_object, method)
            )
            getattr(existing_object, method_name)(new_object)
            return True
        return False

    @staticmethod
    def append_dict_symmetric_diff(existing_dict: dict, new_dict: dict) -> dict:
        symm_diff_keys = set(existing_dict.keys()) ^ set(new_dict.keys())
        new_dict = {}
        for key in symm_diff_keys:
            if key in existing_dict:
                new_dict[key] = existing_dict[key]
            else:
                new_dict[key] = new_dict[key]
        return new_dict

    @staticmethod
    def append_set(
        existing_set: set, new_set: set, only_intersection: bool = False
    ) -> set:
        if only_intersection:
            return existing_set & new_set
        else:
            return existing_set | new_set

    @staticmethod
    def append_list(
        existing_list: list, new_list: list, allow_duplicates: bool = False
    ) -> list:
        if allow_duplicates:
            return existing_list + new_list
        else:
            return list(set(existing_list + new_list))
