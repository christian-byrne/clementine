from typing import List, Tuple, Union, Any


class CallAttempt:
    def __init__(self, func: callable, catch_list: dict[Exception, str]):
        self.func = func
        self.catch_list = catch_list

    def __call__(self, *args, **kwargs):
        return self.wrap_attempt(self.func, self.catch_list, *args, **kwargs)
    
    def wrap_attempt(self, *args, **kwargs) -> Tuple[Any, bool, str]:
        error = ""
        success = True

        try:
            ret = self.func(*args, **kwargs)
        except Exception as e:
            if e in self.catch_list:
                error = self.catch_list[e]
            else:
                error = f"An unexpected error occurred: {e}"
            success = False

        return ret, success, error
