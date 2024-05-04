from service_classes.constants import ENV
from termcolor import colored


def plog(msg):
    if ENV == "DEV":
        print(
            f"[{colored(msg.split(' ')[0], 'light_cyan')}]"
            + "  "
            + " ".join(msg.split(" ")[1:])
        )

def print_errors(errors: list, identifier) -> None:
    if len(errors) > 0:
        for err in errors:
            plog(
                f"{colored('[ERROR][METADATA-CREATION]', 'light_red')} {err} for {identifier}"
            )