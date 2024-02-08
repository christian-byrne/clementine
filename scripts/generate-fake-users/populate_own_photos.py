

# import the current all users json file (/home/c_byrne/school/courses/game310/final-project/wardrobe/src/data/users/all.json)
import json

with open('/home/c_byrne/school/courses/game310/final-project/wardrobe/src/data/users/all.json', 'r') as f:
    initial_object = json.load(f)


# Adding photos to every user that doesnt currently have an ownPhotos property. 
# To find the photos, search in /home/c_byrne/school/courses/game310/final-project/wardrobe/public/pictures/pfps for photos that match the user's name (after lowercasing and replacing spaces with hyphens)
# For each photo found, add it to the user's ownPhotos array with a random number of likes and favorites, he model and creator will all be the same as the example below 
#       "ownPhotos": [
#         {
#           "imageUrl": "/pictures/wednesday-user-photos/wednesday-byzantine-04.png",
#           "likes": 8400,
#           "favorites": 13,
#           "model": "Balenciaga Glamor",
#           "creator": "Wednesday Addams"
#         },
    

import os
import random
import re

# get all the files in the pfps directory
pfps = os.listdir('/home/c_byrne/school/courses/game310/final-project/wardrobe/public/pictures/pfps')

# for each user in the all.json file
for user in initial_object['members']:
    # if the user does not have an ownPhotos property
    if 'ownPhotos' not in user:
        # create an empty ownPhotos array
        user['ownPhotos'] = []
        # for each file in the pfps directory
        for file in pfps:
            # if the file name contains the user's name
            if re.search(user['name'].lower().replace(' ', '-'), file):
                # add a new photo to the user's ownPhotos array
                user['ownPhotos'].append({
                    "imageUrl": f"/pictures/pfps/{file}",
                    "likes": random.randint(1000, 100000),
                    "favorites": random.randint(1, 500),
                    "model": "Balenciaga Glamor",
                    "creator": "Wednesday Addams"
                })

# write the updated all_users json a local json file
with open('all-users-with-photos.json', 'w') as f:
    json.dump(initial_object, f, indent=4)