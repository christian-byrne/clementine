
import json
import os
import datetime
import random
from paths import ProjectPaths

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

def add_attribute_in_a_db(db: dict, attribute: str) -> list:
    """
    Adds an attribute from the database.

    Args:
        db (list): The db as a list of dicts
        attribute (str): The attribute to add.
    """
    ret = []
    for entry in db:
        entry_copy = entry.copy()
        if attribute not in entry_copy:
            ret.append(entry_copy)
            continue
        cur_ranks = entry_copy[attribute]
        new_ranks = []
        for rank in cur_ranks:
            if "#" not in rank:
                # #X rank where X is a random number
                rank = f"#{random.randint(1, 4500)} {rank}"
            new_ranks.append(rank)
        entry_copy[attribute] = new_ranks
        ret.append(entry_copy)
    return ret


if __name__ == "__main__":
    project_paths = ProjectPaths()
    users_db_path = project_paths.get_data_path("users/all.json")
    models_db_path = project_paths.get_data_path("models/all.json")

    with open(users_db_path, "r") as f:
        users_db = json.load(f)
    with open(models_db_path, "r") as f:
        models_db = json.load(f)
     
    new_users_db = add_attribute_in_a_db(users_db, "ranks")
    backup_and_replace(users_db_path, new_users_db)
