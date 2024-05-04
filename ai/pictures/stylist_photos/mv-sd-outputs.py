
sd_outputs_path = {
    "singles": "/home/c_byrne/tools/sd/sd-interfaces/stable-diffusion-webui/outputs/txt2img-images/2024-02-07",
    "grids": "/home/c_byrne/tools/sd/sd-interfaces/stable-diffusion-webui/outputs/txt2img-grids/2024-02-07"
}

# import characters dict from json list from prompt-gen-generated-character-tags.json
import json

with open('prompt-gen-generated-character-tags.json', 'r') as f:
    characters = json.load(f)

# Every character has 4 images in the singles folder and 1 image in the grids folder
# Loop through each character and rename their images to match the style of firstname-lastname-#.png (lowercased) where # is the index of the image (0-3 for singles, 1 for grids)
# the grid photos will be named firstname-lastname-grid.png
# Then move all images to /home/c_byrne/school/courses/game310/final-project/wardrobe/public/pictures/pfps
    
import os
import shutil

current_singles_pic_counter = 0
current_grids_pic_counter = 0
singles = os.listdir(sd_outputs_path['singles'])
# sort by file name
singles.sort()
# grids = os.listdir(sd_outputs_path['grids'])

for character in characters:
    formmated_name = character['name'].replace(" ", "-").lower()
    for i in range(4):
        # we dont know the names of files, only that they were made in the same order as the characters
        # so we will just use the counter to get the next file
        old_path = f"{sd_outputs_path['singles']}/{singles[current_singles_pic_counter]}"        
        new_path = f"/home/c_byrne/school/courses/game310/final-project/wardrobe/public/pictures/pfps/{formmated_name}-{i}.png"
        print(f"Moving {old_path} to {new_path}")

        current_singles_pic_counter += 1
        shutil.copy(old_path, new_path)
    
    # old_grid_path = f"{sd_outputs_path['grids']}/{grids[current_grids_pic_counter]}"
    # new_grid_path = f"/home/c_byrne/school/courses/game310/final-project/wardrobe/public/pictures/pfps/{formmated_name}-grid.png"
    # print(f"Moving {old_grid_path} to {new_grid_path}")
    # current_grids_pic_counter += 1
    # shutil.copy(old_grid_path, new_grid_path)    