from db_handlers.table import Table
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


class FieldValues(ValueList):
    def __init__(self, table: Table, field_name: str, values: list):
        self.table = table
        self.field_name = field_name
        self.values = values

    def get_values(self) -> list:
        return self.values

    def distinct(self) -> ValueList:
        return FieldValues(self.table, self.field_name, list(set(self.values)))

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
        return self.get_values().index(value, start, stop)

    def count(self, selector) -> int:
        return self.__find_matches(selector, "eq", count_only=True)

    def sort(self, key=None, reverse=False) -> None:
        self.values.sort(key=key, reverse=reverse)

    def reverse(self) -> None:
        self.values.reverse()

    def copy(self) -> ValueList:
        return FieldValues(self.table, self.field_name, self.get_values().copy())

    def __bool_resolve(self, value, selector, operator):
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

    def __find_matches(
        self, selector: Any, operator, count_only: bool = False
    ) -> Union[Tuple[ValueList, int], int]:
        count = 0
        result = []

        def increment(value):
            nonlocal count
            count += 1
            if not count_only:
                result.append(value)

        for value in self.values:
            if (
                not isinstance(value, dict)
                and self.__bool_resolve(value, selector, operator)
            ) or (
                set(selector.keys()).issubset(value.keys())
                and all(
                    self.__bool_resolve(value[key], selector[key], operator)
                    for key in selector.keys()
                )
            ):
                increment(value)

        return (
            count if count_only else FieldValues(self.table, self.field_name, result)
        ), count

    def __iter__(self) -> Iterable:
        return iter(self.get_values())

    def __contains__(self, item) -> bool:
        return item in self.get_values()

    def __add__(self, other: ValueList) -> ValueList:
        return FieldValues(
            self.table, self.field_name, self.get_values() + other.get_values()
        )

    def __eq__(self, selector) -> ValueList:
        return self.__find_matches(selector, "eq")[0]

    def __ne__(self, selector) -> ValueList:
        return self.__find_matches(selector, "ne")[0]

    def __lt__(self, selector) -> ValueList:
        return self.__find_matches(selector, "lt")[0]

    def __le__(self, selector) -> ValueList:
        return self.__find_matches(selector, "le")[0]

    def __gt__(self, selector) -> ValueList:
        return self.__find_matches(selector, "gt")[0]

    def __ge__(self, selector) -> ValueList:
        return self.__find_matches(selector, "ge")[0]

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
