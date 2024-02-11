
source_dir = "/home/c_byrne/school/courses/game310/final-project/wardrobe/public/pictures/models"

import os

# Get all the model folders in the source directory
model_folders = [f for f in os.listdir(source_dir) if os.path.isdir(os.path.join(source_dir, f))]


database = []

# For each model folder, get all the images (excpet the one's with "grid" in the name)
for model in model_folders:
    model_path = os.path.join(source_dir, model)
    images = [f for f in os.listdir(model_path) if os.path.isfile(os.path.join(model_path, f)) and "grid" not in f]
    for image in images:
        database.append({
            # modelpath should start at /pictures
            "imageSrc": f"/pictures/models/{model}/{image}",
            "modelSrc": f"/pictures/models/{model}",
            "modelFormatted" : model.replace("-", " ").title(),
            "image": image
        })


# Write the database to a json
import json
with open('photos-database.json', 'w') as f:
    json.dump(database, f)

print("Database created")