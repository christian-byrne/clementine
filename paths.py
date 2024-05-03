import json
import os
import pathlib
from constants import PROJECT_NAME

class ProjectPaths:
    PROJECT_ROOT = (
        os.path.dirname(os.path.realpath(__file__)).split(PROJECT_NAME)[0] + PROJECT_NAME
    )
    
    def __init__(self, project_name: str) -> None:
        self.project_name = project_name
        self.project_root = (
            os.path.dirname(os.path.realpath(__file__)).split(project_name)[0] + project_name
        )

    def get_data_path(self, data_dir: str, data_filename: str) -> str:
        return os.path.join(self.project_root, data_dir, data_filename)

    def get_target_dir(self, target_dir: str) -> str:
        return os.path.join(self.project_root, target_dir)



data_path = os.path.join(PROJECT_ROOT, "data/styles/styles.json")
target_dir = os.path.join(PROJECT_ROOT, "public/pictures/styles")