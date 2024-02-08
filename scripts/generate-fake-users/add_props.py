
# import the current all users json file (/home/c_byrne/school/courses/game310/final-project/wardrobe/src/data/users/all.json)
import json

with open('/home/c_byrne/school/courses/game310/final-project/wardrobe/src/data/users/all.json', 'r') as f:
    initial_object = json.load(f)
    

# import the new props to add from the other json file 
# (/home/c_byrne/school/courses/game310/final-project/wardrobe/scripts/generate-fake-users/generated-ranks.json)
with open('/home/c_byrne/school/courses/game310/final-project/wardrobe/scripts/generate-fake-users/generated-titles.json', 'r') as f:
    new_props = json.load(f)



for props in new_props:
    for user in initial_object['members']:
        if user["name"] == props["name"]:
            user["titles"] = props["titles"]
            break

# write the updated all_users json a local json file
with open('all-users-with-props.json', 'w') as f:
    json.dump(initial_object, f, indent=4)