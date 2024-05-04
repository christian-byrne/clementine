from paths import ProjectPaths
import json

def get_field_values(table_path: str, field_name: str, distinct: bool = False) -> list:
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