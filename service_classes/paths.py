import os
from pathlib import Path
from service_classes.constants import PROJECT_DIR_NAME


class ProjectPaths:
    def __init__(self) -> None:
        self.project_root = Path(
            os.path.dirname(os.path.realpath(__file__)).split(PROJECT_DIR_NAME)[0]
            + PROJECT_DIR_NAME
        )

    def get_data_path(self, sub_path: str) -> Path:
        return self.project_root / "data" / Path(sub_path)

    def get_public_path(self, sub_path: str) -> Path:
        return self.project_root / "public" / Path(sub_path)

    def get_project_root(self) -> Path:
        return self.project_root

    def get_scripts_path(self, sub_path: str) -> Path:
        return self.project_root / "scripts" / Path(sub_path)

    def get_ai_path(self, sub_path: str) -> Path:
        return self.project_root / "ai" / Path(sub_path)

    def get_db_handlers_path(self, sub_path: str) -> Path:
        return self.project_root / "service_classes" / Path(sub_path)

    def __call__(self):
        return self