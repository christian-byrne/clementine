from faker import Faker
import random
import os
import datetime
import json


def create_img_records(model_folder, source_dir, users_db):
    """
    Create image records for the given model folder and source directory.

    Args:
        model_folder (list): List of model names.
        source_dir (str): Path to the source directory.

    Returns:
        list: List of image records.
    """
    pics_database = []
    for model in model_folder:
        model_path = os.path.join(source_dir, model)
        images = [
            f
            for f in os.listdir(model_path)
            if os.path.isfile(os.path.join(model_path, f)) and "grid" not in f
        ]
        print(f"Adding {len(images)} images for {model} to photos database.")
        for image in images:
            image_record = {
                "imagePath": f"/pictures/models/{model}/{image}",
                "modelPath": f"/pictures/models/{model}",
                "modelTitle": model.replace("-", " ").title(),
                "modelDirName": model,
                "imageFileName": image,
                "likes": random.randint(0, 1000),
                "favorites": random.randint(0, 1000),
                "downloads": random.randint(0, 1000),
                "shared": random.randint(0, 1000),
                "views": random.randint(0, 100000),
                "dateCreated": fake.date_this_year().strftime("%B %d, %Y"),
                "creator": "UNKNOWN",
            }
            photo_owner = find_photos_owner(model, users_db)
            if photo_owner:
                image_record["creator"] = photo_owner

            pics_database.append(image_record)

    print(f"\n\n\nAdded a total of {len(pics_database)} images to photos database.\n\n")
    return pics_database


def find_photos_owner(model, users_db):
    """We find a photo's owner by finding the model it is associated with and then finding the creator of that model."""
    for user in users_db:
        if "ownModels" not in user:
            continue
        user_models = user["ownModels"]
        if model.replace(" ", "-").lower() in [m.replace(" ", "-").lower() for m in user_models]:
            return user["name"]

def backup_and_replace(old_path, new_json):
    """
    Backs up the old json file and replaces it with the new one.

    Args:
        old_path (str): The path to the old json file.
        new_json (dict): The new json data to replace the old file with.
    """
    with open(old_path, "r") as f:
        old_json = json.load(f)

    # Only create 3 backups, then overwrite the oldest one and iterate the key at end of file name
    old_path_dir = os.path.dirname(old_path)
    backup_files = [f for f in os.listdir(old_path_dir) if "backup" in f]
    # name should have date MonthDay added to -backup- and before .json
    month_day = datetime.datetime.now().strftime("%B%d")
    backup_filename = f"{old_path.replace('.json', f'-backup-{month_day}.json')}"
    if len(backup_files) >= 3:
        # get the oldest backup file
        oldest_backup = min(backup_files, key=os.path.getctime)
        # remove the oldest backup
        os.remove(os.path.join(old_path_dir, oldest_backup))
    # write the old json to the backup file
    with open(backup_filename, "w") as f:
        json.dump(old_json, f)
    print(f"Backup created at {backup_filename}")

    # write the new json to the old path
    with open(old_path, "w") as f:
        json.dump(new_json, f)

    print(f"Updated {old_path} with new data")


def random_badges():
    # generate random number for badges between 0 and 3, with higher weight towards lower numbres
    num_badges = random.choices([0, 1, 2, 3], weights=[30, 50, 15, 5])[0]
    # get random badges
    selected_badges = random.sample(tags, num_badges)
    return selected_badges


def random_bounty():
    # 26% chance to have a bounty
    has_bounty = random.choices([True, False], weights=[22, 78])[0]
    # if has bounty, choose random from list, if the bounty_task has $MODEL in its name, replace it with a random model name
    if has_bounty:
        bounty_task = random.choice(bounty_tasks)
        if "$MODEL" in bounty_task:
            bounty_task = bounty_task.replace(
                "$MODEL", random.choice(model_folders).replace("-", " ").title()
            )
        bounty = {
            "status": "BOUNTY AVAILABLE",
            "message": bounty_task,
            # reward should be a random number between 20 and 950 rounded to the nearest 50
            "reward": round(random.randint(20, 950) / 50) * 50,
        }
        return bounty
    return None


def random_community_unlock(has_bounty):
    # 42% chance to have a community unlock, unless it has a bounty, then 0%
    has_community_unlock = (
        random.choices([True, False], weights=[35, 65])[0] if not has_bounty else False
    )
    if has_community_unlock:
        goal = round(random.randint(20, 950) / 50) * 50
        has_completed = random.choices([True, False], weights=[35, 65])[0]
        if has_completed:
            progress = goal
            message = "UNLOCKED \ud83c\udf89 for all Users"
        else:
            progress = random.randint(0, goal - 1)
            message = f"{goal - progress} more rubies to unlock for all users!"
        return {"goal": goal, "progress": progress, "message": message}
    return None


def create_models_records(models_in_dir, prev_db):
    """
    Create model records for models found in the directory but not in the previous database.

    Args:
        models_in_dir (list): List of model names found in the directory.
        prev_db (list): List of dictionaries representing the previous database.

    Returns:
        list: List of dictionaries representing the newly created model records.
    """
    ret = []
    new_models = []
    for model in models_in_dir:
        model_name_formatted = model.replace("-", " ").title()
        model_name_system = model.replace(" ", "-").lower()
        existing_models = [m["title"].replace(" ", "-").lower() for m in prev_db]

        if model_name_system not in existing_models:
            new_models.append(model_name_formatted)
            print(f"Found model folder not in database: {model_name_formatted}")
            print(f"Adding {model_name_formatted} to database")
            has_bounty = random_bounty()
            has_community_unlock = random_community_unlock(has_bounty)
            model_record = {
                "title": model_name_formatted,
                "imageSrc": f"/pictures/models/{model}/{model}-grid-2x2.png",
                "badges": random_badges(),
                "bounties": {} if not has_bounty else has_bounty,
                "communityUnlock": (
                    {} if not has_community_unlock else has_community_unlock
                ),
                "tags": [
                    "high fashion",
                    "streetwear",
                    "urban",
                ],
                "likes" : random.randint(0, 1000),
                "favorites": random.randint(0, 1000),
                "downloads": random.randint(0, 1000),
                "shared": random.randint(0, 1000),
                "views": random.randint(0, 100000),
                # "dateCreated": fake.date_this_year().strftime("%B %d, %Y"),
                "dateCreated": datetime.datetime.now().strftime("%B %d, %Y"),
                "description": "Lorem, ipsum dolor.",
                "requirements": "Lorem, ipsum dolor.",
                "creator": "Wednesday Addams",
                "numPhotos": len(
                    [
                        f
                        for f in os.listdir(os.path.join(MODELS_DIR, model))
                        if os.path.isfile(os.path.join(MODELS_DIR, model, f))
                    ]
                ),
            }
            ret.append(model_record)

    if len(ret) == 0:
        print("No new models found in dir since last update.")
    
    print()
    return [ret, new_models]


def shuffle_database(database):
    """
    Shuffles the given database in place.

    Args:
        database (list): The list representing the database.

    Returns:
        list: The shuffled database.
    """
    random.shuffle(database)
    return database


def rehash_user_ids(users_db):
    """
    Rehashes the user ids in the database to be unique.

    Args:
        users_db (list): The list of user records.

    Returns:
        list: The rehashed user records.
    """
    ret = []
    for index, user in enumerate(users_db):
        user_copy = user.copy()
        # create unique id for user
        user_copy["id"] = index + 1
        user_copy["idHash"] = fake.sha256()
        user_copy["nameSystem"] = user_copy["name"].replace(" ", "-").lower()
        ret.append(user_copy)
    return ret

def sort_all_records_in_db(db, key):
    """
    Sorts all records in the database by title.

    Args:
        db (list): The list of records in the database.

    Returns:
        list: The sorted database.
    """
    if type(db[0][key]) == int:
        return sorted(db, key=lambda x: x[key])
    elif type(db[0][key]) == list:
        return sorted(db, key=lambda x: x[key][0].lower())
    else:
        return sorted(db, key=lambda x: x[key].lower())

def sort_internal_attributes_db_items(db):
    """Sort entry in each record in the database by key name (alphabetically)"""
    ret = []
    for entry in db:
        entry_copy = entry.copy()
        entry_copy = dict(sorted(entry_copy.items()))
        ret.append(entry_copy)
    return ret

if __name__ == "__main__":
    # create a faker instance
    fake = Faker()

    PHOTOS_DB_PATH = "/home/c_byrne/school/courses/game310/final-project/wardrobe/data/photos/all.json"
    MODELS_DB_PATH = "/home/c_byrne/school/courses/game310/final-project/wardrobe/data/models/all.json"
    USERS_DB_PATH = "/home/c_byrne/school/courses/game310/final-project/wardrobe/data/users/all.json"
    MODELS_DIR = "/home/c_byrne/school/courses/game310/final-project/wardrobe/public/pictures/models"


    with open(PHOTOS_DB_PATH, "r") as f:
        photos_prev = json.load(f)
    with open(MODELS_DB_PATH, "r") as f:
        models_prev = json.load(f)
    with open(USERS_DB_PATH, "r") as f:
        users_prev = json.load(f)

    # Users maintenance
    updated_users_db = rehash_user_ids(users_prev)
    print("Updated user ids and hashes in database.")
    updated_users_db = sort_all_records_in_db(updated_users_db, "id")
    print("Sorted users by id.")
    updated_users_db = sort_internal_attributes_db_items(updated_users_db)
    print("Sorted internal attributes in user records.")
    backup_and_replace(USERS_DB_PATH, updated_users_db)

    # Get all the model folders in the source directory
    model_folders = [
        f for f in os.listdir(MODELS_DIR) if os.path.isdir(os.path.join(MODELS_DIR, f))
    ]
    print(f"Model folders: {model_folders}\n\n")

    # Models DB only updates if there are new folders
    updated_models_db, new_model_candidates = create_models_records(model_folders, models_prev)
    print("Updated models database.")
    if updated_models_db:
        print("\nNew models found:\n")
        for model in new_model_candidates:
            print(f"  - {model}")
        print()
        if input("Would you like to add these models to the database or abort and fix manually?\n(y) for yes - add these models\n(a) for abort and fix\n> ").lower() != "y":
            exit("Aborted. Fix the models manually and try again.")
    else:
        print("No new models found in dir since last update.")
    
    updated_models_db = models_prev + updated_models_db
    updated_models_db = sort_all_records_in_db(updated_models_db, "title")
    print("Sorted models by title.")
    updated_models_db = sort_internal_attributes_db_items(updated_models_db)
    print("Sorted internal attributes in model records.")
    backup_and_replace(MODELS_DB_PATH, updated_models_db)

    # Photos DB starts from nothing everytime because it doesnt matter
    updated_photos_db = shuffle_database(create_img_records(model_folders, MODELS_DIR, updated_users_db))
    print("Updated photos database.")
    print("Shuffled photos database.")
    updated_photos_db = sort_internal_attributes_db_items(updated_photos_db)
    print("Sorted internal attributes in photo records.")
    backup_and_replace(PHOTOS_DB_PATH, updated_photos_db)
    print("\n\nDatabase updated\n")
