import json
import os


project_name = "wardrobe"
project_root = (
    os.path.dirname(os.path.realpath(__file__)).split(project_name)[0] + project_name
)
data_path = os.path.join(project_root, "data/styles/styles.json")
target_dir = os.path.join(project_root, "public/pictures/styles")

with open(data_path, "r") as f:
    styles = json.load(f)

for style in styles:
    dir_name = style["title"].replace(" ", "-").lower()
    dir_path = os.path.join(target_dir, dir_name)
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)
