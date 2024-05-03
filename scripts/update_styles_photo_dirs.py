


data_path = "/home/c_byrne/school/courses/game310/final-project/wardrobe/data/styles/styles.json"
target_dir = "/home/c_byrne/school/courses/game310/final-project/wardrobe/public/pictures/styles"


import json
import os
import shutil

with open(data_path, "r") as f:
    styles = json.load(f)

for style in styles:
    dir_name = style["title"].replace(" ", "-").lower()
    dir_path = os.path.join(target_dir, dir_name)
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)