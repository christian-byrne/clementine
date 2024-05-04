import json
import os
import datetime

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

def delete_attribute_in_a_db(db, attribute):
    """
    Deletes an attribute from the database.

    Args:
        db (list): The db as a list of dicts
        attribute (str): The attribute to delete.
    """
    ret = []
    for entry in db:
        entry_copy = entry.copy()
        if attribute in entry:
            del entry_copy[attribute]
        ret.append(entry_copy)
    return ret


if __name__ == "__main__":
    USERS_DB_PATH = "/home/c_byrne/school/courses/game310/final-project/wardrobe/data/users/all.json"

    with open(USERS_DB_PATH, "r") as f:
        db = json.load(f)
    
    new_db = delete_attribute_in_a_db(db, "id")

    backup_and_replace(USERS_DB_PATH, new_db)
    