from typing import Tuple, Any


class CallAttempt:
    def __init__(self, func: callable, catch_list: dict[Exception, str]):
        self.func = func
        self.catch_list = catch_list

    def __call__(self, *args, **kwargs) -> Tuple[Any, bool, str]:
        self.error = ""
        self.success = True
        try:
            self.result = self.func(*args, **kwargs)
        except Exception as e:
            if any(isinstance(e, error_type) for error_type in self.catch_list):
                self.error = f"{self.catch_list[type(e)]}: {e}"
            else:
                self.error = f"An unexpected error occurred: {e}"
            self.success = False
            self.result = None

        return self

    def __or__(self, fallback):
        if self.success:
            return self.result, self.success, self.error
        else:
            return fallback, self.success, self.error



