from faker import Faker
import random
import os
import datetime
import json

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
