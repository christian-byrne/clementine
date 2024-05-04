from pathlib import Path
from typing import Any, Dict, List
from db_handlers.enums.options import UpdateOption
from db_handlers.table import Table, DatabaseTable

class UpdateUtils:
    def __init__(self, table: Table, primary_key: str):
        self.table = table
        self.primary_key = primary_key

  

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
        UpdateUtils.append_reference_types(existing_rec, record, primary_key)

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
                    existing_rec[field] = UpdateUtils.append_list(
                        existing_rec.get(field, []), value, allow_duplicates
                    )
                elif isinstance(value, set):
                    existing_rec[field] = UpdateUtils.append_set(
                        existing_rec.get(field, set()), value
                    )
                elif isinstance(value, dict):
                    if dict_symm_diff:
                        existing_rec[field] = UpdateUtils.append_dict_symmetric_diff(
                            existing_rec.get(field, {}), value
                        )
                    else:
                        UpdateUtils.append_reference_types(
                            existing_rec[field], value, primary_key, allow_duplicates
                        )

                elif not isinstance(
                    value, (str, int, float, bool, complex, type(None))
                ):
                    UpdateUtils.append_custom_class(existing_rec[field], value)

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
