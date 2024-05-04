import json
from paths import ProjectPaths
from pathlib import Path


def main():
    project_paths = ProjectPaths()
    data_path = project_paths.get_data_path("styles/styles.json")
    target_dir = project_paths.get_public_path("pictures/styles")

    with open(data_path, "r") as f:
        styles = json.load(f)

    for style in styles:
        dir_name = style["title"].replace(" ", "-").lower()
        dir_path = target_dir / Path(dir_name)
        if not dir_path.exists():
            dir_path.mkdir()


if __name__ == "__main__":
    main()
