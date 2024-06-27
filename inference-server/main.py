from pathlib import Path
import logging

from src.server import ComfyServer
from src.client import ComfyClient
from src.workflow_wrapper import ComfyAPIWorkflow


THIS_FILE_PATH = Path(__file__).resolve().parent
# PORT=1111
PORT = 18188
PYTHON_PATH = Path("/usr/bin/python3")
COMFY_PATH = Path("/home/user/ComfyUI")
OUTPUT_DIRECTORY = COMFY_PATH / "output"
INPUT_DIRECTORY = COMFY_PATH / "input"
SERVER_URL = "http://127.17.0.2"
# SERVER_PATH = "/rp-api/runsync"
SERVER_PATH = ""
MAX_CONNECT_ATTEMPTS = 25  # Increase for slow systems
WORKFLOW_NAME = "default"
WORKFLOW_TEMPLATE_PATH = (
    THIS_FILE_PATH / "workflows" / "default_workflow-API_version.json"
)


def main():
    # server = ComfyServer(
    #     output_directory=OUTPUT_DIRECTORY,
    #     input_directory=INPUT_DIRECTORY,
    #     comfy_path=COMFY_PATH,
    #     python_path=PYTHON_PATH,
    #     server_url=SERVER_URL,
    #     port=8188,
    #     log_level=logging.DEBUG,
    # )
    client = ComfyClient(
        workflow=ComfyAPIWorkflow(
            workflow_template_path=WORKFLOW_TEMPLATE_PATH,
            name=WORKFLOW_NAME,
        ),
        server_path_parts=SERVER_PATH,
        server_url=SERVER_URL,
        max_connect_attempts=MAX_CONNECT_ATTEMPTS,
        port=PORT,
        log_level=logging.DEBUG,
    )
    # server.start()
    client.connect()

    client.queue_workflow()

    client.disconnect()
    # server.kill()


if __name__ == "__main__":
    main()
