from pathlib import Path
from paths import ProjectPaths
import json
from typing import Any, Protocol, Union, Iterable, Tuple


class ValueList(Protocol):
    def get_parent_table(self) -> "Table": ...
    def get_field_name(self) -> str: ...
    def __eq__(self, selector: Any) -> "ValueList": ...
    def __len__(self) -> int: ...
    def __getitem__(self, index: int) -> Any: ...
    def append(self, value: Any) -> None: ...
    def extend(self, new_values: Iterable) -> None: ...
    def insert(self, index: int, value: Any) -> None: ...
    def remove(self, value: Any) -> None: ...
    def pop(self, index: int) -> Any: ...
    def clear(self) -> None: ...
    def index(self, value: Any, start: int = 0, stop: int = 0) -> int: ...
    def count(self, selector: Any) -> int: ...
    def sort(self, key=None, reverse=False) -> None: ...
    def reverse(self) -> None: ...
    def copy(self) -> "ValueList": ...
    def __iter__(self) -> Iterable: ...
    def __contains__(self, item: Any) -> bool: ...
    def __add__(self, other: "ValueList") -> "ValueList": ...


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


class DB_ValueList(ValueList):
    def __init__(self, table: Table, field_name: str, values: list):
        self.table = table
        self.field_name = field_name
        self.values = values

    def find_matches(
        self, selector: Any, operator, count_only: bool = False
    ) -> Union[Tuple[ValueList, int], int]:
        count = 0
        result = []

        def increment(value):
            nonlocal count
            count += 1
            if not count_only:
                result.append(value)

        def bool_resolve(value, selector):
            if (
                operator == "eq"
                and value == selector
                or operator == "ne"
                and value != selector
                or operator == "lt"
                and value < selector
                or operator == "le"
                and value <= selector
                or operator == "gt"
                and value > selector
                or operator == "ge"
                and value >= selector
            ):
                return True
            return False

        for value in self.values:
            if (not isinstance(value, dict) and bool_resolve(value, selector)) or (
                set(selector.keys()).issubset(value.keys())
                and all(
                    bool_resolve(value[key], selector[key]) for key in selector.keys()
                )
            ):
                increment(value)

        return (
            count if count_only else DB_ValueList(self.table, self.field_name, result)
        ), count

    def distinct(self) -> ValueList:
        return DB_ValueList(self.table, self.field_name, list(set(self.values)))

    def __eq__(self, selector) -> ValueList:
        return self.find_matches(selector, "eq")[0]

    def __ne__(self, selector) -> ValueList:
        return self.find_matches(selector, "ne")[0]

    def __lt__(self, selector) -> ValueList:
        return self.find_matches(selector, "lt")[0]

    def __le__(self, selector) -> ValueList:
        return self.find_matches(selector, "le")[0]

    def __gt__(self, selector) -> ValueList:
        return self.find_matches(selector, "gt")[0]

    def __ge__(self, selector) -> ValueList:
        return self.find_matches(selector, "ge")[0]

    def __len__(self):
        return len(self.values)

    def __getitem__(self, primary_key_or_index: Any):
        if isinstance(primary_key_or_index, int):
            return self.values[primary_key_or_index]

        for record in self.table.iter():
            if record[self.table.primary_key_or_index] == primary_key_or_index:
                return record
        raise KeyError(
            f"No record with primary key {primary_key_or_index} found in table {self.table.get_name()}"
        )

    def append(self, value):
        self.values.append(value)

    def extend(self, new_values: Iterable):
        self.values.extend(new_values)

    def insert(self, index: int, value) -> None:
        self.values.insert(index, value)

    def remove(self, value) -> None:
        self.values.remove(value)

    def pop(self, index: int) -> Any:
        return self.values.pop(index)

    def clear(self) -> None:
        self.values.clear()

    def index(self, value, start: int = 0, stop: int = 0):
        return self.values.index(value, start, stop)

    def count(self, selector) -> int:
        return self.find_matches(selector, "eq", count_only=True)

    def sort(self, key=None, reverse=False) -> None:
        self.values.sort(key=key, reverse=reverse)

    def reverse(self) -> None:
        self.values.reverse()

    def copy(self) -> ValueList:
        return DB_ValueList(self.table, self.field_name, self.values.copy())

    def __iter__(self) -> Iterable:
        return iter(self.values)

    def __contains__(self, item) -> bool:
        return item in self.values

    def __add__(self, other: ValueList) -> ValueList:
        return DB_ValueList(self.table, self.field_name, self.values + other.values)


class DB_Table(Table):
    def __init__(self, table_path: Path, primary_key: str):
        self.path = table_path
        self.primary_key = primary_key

        self.name = table_path.stem
        self.extension = table_path.suffix
        self.parent_dir = table_path.parent
        self.data = self.load_data()

    def load_data(self):
        with open(self.path, "r") as f:
            data = json.load(f)
        return data

    def iter(self):
        for record in self.data:
            yield record

    def values(self, field_name: str, distinct: bool = False) -> list:
        project_paths = ProjectPaths()
        if "data" in table_path:
            table_path = table_path.split("data/")[1]
        data_path = project_paths.get_data_path(table_path)

        with open(data_path, "r") as f:
            table = json.load(f)

        values = [record[field_name] for record in table]

        if distinct:
            values = list(set(values))

        return values

    def __getitem__(self, field_name: str):
        return [record[field_name] for record in self.data if field_name in record]

    def find_matches(self, selector: Any, operator: str) -> Table:
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
        return DB_Table(self.path, self.primary_key, new_data)
        

    def __eq__(self, primary_key_selector: Any) -> Table:
        return self.find_matches(primary_key_selector, "eq")
    
    def __ne__(self, primary_key_selector: Any) -> Table:
        return self.find_matches(primary_key_selector, "ne")
    
    def __lt__(self, primary_key_selector: Any) -> Table:
        return self.find_matches(primary_key_selector, "lt")
    
    def __le__(self, primary_key_selector: Any) -> Table:
        return self.find_matches(primary_key_selector, "le")
    
    def __gt__(self, primary_key_selector: Any) -> Table:
        return self.find_matches(primary_key_selector, "gt")
    
    def __ge__(self, primary_key_selector: Any) -> Table:
        return self.find_matches(primary_key_selector, "ge")
    
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
        return DB_Table(self.path, self.primary_key, self.data + other.data)

