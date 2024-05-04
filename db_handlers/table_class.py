from pathlib import Path
import json
from typing import Any, Protocol, Iterable
from db_handlers.field_values_class import ValueList


class Table(Protocol):
    def get_path(self) -> Path: ...
    def get_name(self) -> str: ...
    def iter(self) -> Iterable: ...
    def values(self, field_name: str, distinct: bool = False) -> list: ...
    def __getitem__(self, field_name: str) -> ValueList: ...
    def __str__(self) -> str: ...
    def __eq__(self, primary_key_selector: Any) -> "Table": ...
    def __ne__(self, primary_key_selector: Any) -> "Table": ...
    def __lt__(self, other: "Table") -> "Table": ...
    def __le__(self, primary_key_selector: Any) -> "Table": ...
    def __gt__(self, other: "Table") -> "Table": ...
    def __ge__(self, other: "Table") -> "Table": ...
    def __len__(self) -> int: ...


class DatabaseTable(Table):
    def __init__(self, table_path: Path, primary_key: str):
        self.path = table_path
        self.primary_key = primary_key

        self.name = table_path.stem
        self.extension = table_path.suffix
        self.parent_dir = table_path.parent
        self.data = self.__load_data()

    def iter(self):
        for record in self.data:
            yield record

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
