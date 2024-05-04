from service_classes.constants import ENV
from termcolor import colored


def plog(msg):
    if ENV == "DEV":
        print(
            f"[{colored(msg.split(' ')[0], 'light_cyan')}]"
            + "  "
            + " ".join(msg.split(" ")[1:])
        )
