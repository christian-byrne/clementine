from faker import Faker
from paths import ProjectPaths
from pathlib import Path
import pathlib
import os
import random
import time
from constants import (
    STYLISTS_DB_DIR_NAME,
    PHOTOS_DB_DIR_NAME,
    USERS_DB_DIR_NAME,
    STYLISTS_PUBLIC_DIR_NAME,
    PICTURE_EXTENSION_LIST,
)
from db_handlers.table import DatabaseTable


def update_stylists_table(dry_run: bool =False):
    project_paths = ProjectPaths()
    stylists_db_path = project_paths.get_data_path(STYLISTS_DB_DIR_NAME)
    stylists_table = DatabaseTable(stylists_db_path, "titleSystemName")

    for stylist_dir in project_paths.get_public_path(STYLISTS_PUBLIC_DIR_NAME).iterdir():
        if stylist_dir.is_dir() and any(stylist_dir.iterdir()):
            stylist_record = {
                
                "stylistPath": "/" / STYLISTS_PUBLIC_DIR_NAME / stylist_dir.name,
                "stylistDirName": stylist_dir.name,
                "stylistTitle": stylist_dir.name.replace("-", " ").title(),
                "likes": random.randint(0, 800),
                "favorites": random.randint(0, 600),
                "downloads": random.randint(0, 280),
                "shared": random.randint(0, 380),
                "views": random.randint(0, 10000),
                "dateCreated": fake.date_this_year().strftime("%B %d, %Y"),
                "creator": "UNKNOWN",
            }
            photo_owner = find_photos_owner(stylist_dir)
            if photo_owner:
                stylist_record["creator"] = photo_owner

            stylists_database.append(stylist_record)

def update_photos_table(dry_run: bool =False):
    """
    Update the photos table with the latest images.
    """
    fake = Faker()
    project_paths = ProjectPaths()
    stylists_db_path = project_paths.get_data_path(STYLISTS_DB_DIR_NAME)
    stylists_table = DatabaseTable(stylists_db_path, "titleSystemName")

    for stylist in project_paths.get_public_path(STYLISTS_PUBLIC_DIR_NAME).iterdir():
        stylist_path = (
            Path(project_paths.get_public_path(STYLISTS_PUBLIC_DIR_NAME)) / stylist
        )

        if stylist_path.is_dir():
            images = [
                path
                for path in stylist_path.iterdir()
                if not path.is_dir() and path.suffix in PICTURE_EXTENSION_LIST
            ]
            for image in images:
                image_record = {
                    "imagePath": "/" / STYLISTS_PUBLIC_DIR_NAME / stylist.name / image.name,
                    "stylistPath": "/" / STYLISTS_PUBLIC_DIR_NAME / stylist.name,
                    "stylistTitle": stylist.name.replace("-", " ").title(),
                    "stylistDirName": stylist.name,
                    "likes": random.randint(0, 800),
                    "favorites": random.randint(0, 600),
                    "downloads": random.randint(0, 280),
                    "shared": random.randint(0, 380),
                    "views": random.randint(0, 10000),
                    "dateCreated": fake.date_this_year().strftime("%B %d, %Y"),
                    "creator": "UNKNOWN",
                }
                photo_owner = find_photos_owner(stylist)
                if photo_owner:
                    image_record["creator"] = photo_owner

                pics_database.append(image_record)


def create_photo_records(stylists_folder, source_dir, users_db):
    """
    Create image records for the given model folder and source directory.

    Args:
        model_folder (list): List of model names.
        source_dir (str): Path to the source directory.

    Returns:
        list: List of image records.
    """
    pics_database = []
    for model in stylists_folder:
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
