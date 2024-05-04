from faker import Faker
from pathlib import Path
import random
from service_classes.paths import ProjectPaths
from service_classes.constants import (
    STYLISTS_DB_DIR_NAME,
    STYLISTS_PUBLIC_DIR_NAME,
    STYLISTS_DB_PK,
    STYLISTS_DB_FILE_NAME,
    ENV,
    PICTURE_EXTENSION_LIST,
    PHOTOS_DB_DIR_NAME,
    PHOTOS_DB_FILE_NAME,
    PHOTOS_DB_PK
)
from service_classes.table import DatabaseTable
from service_classes.metadata import MetaData
from service_classes.enums.options import UpdateOption
from termcolor import colored
from service_classes.logging.log_ import plog


def photos_fill_empty(dry_run: bool = False) -> None:
    fake = Faker()
    project_paths = ProjectPaths()

    stylists_table = DatabaseTable(
        project_paths.get_data_path(STYLISTS_DB_DIR_NAME) / STYLISTS_DB_FILE_NAME,
        STYLISTS_DB_PK,
    )
    photos_table = DatabaseTable(
        project_paths.get_data_path(PHOTOS_DB_DIR_NAME) / PHOTOS_DB_FILE_NAME,
        PHOTOS_DB_PK
    )

    new_image_records = []
    for stylist_dir in project_paths.get_public_path(
        STYLISTS_PUBLIC_DIR_NAME
    ).iterdir():
        if stylist_dir.is_dir():
            images = [
                path
                for path in stylist_dir.iterdir()
                if not path.is_dir() and path.suffix in PICTURE_EXTENSION_LIST
            ]

            for image in images:
                image_record = {
                    PHOTOS_DB_PK: "/" + str(Path.relative_to(image, project_paths.get_public_path(""))),
                    "dateCreated": fake.date_this_year().strftime("%B %d, %Y"), 
                    "downloads": random.randint(0, 280),
                    "favorites": random.randint(0, 600),
                    "likes": random.randint(0, 800),
                    "shared": random.randint(0, 380),
                    "views": random.randint(0, 10000),
                }
                metadata, success, error = MetaData(image)()
                print_errors(error, image.name)
                image_record.update(metadata)
                new_image_records.append(image_record)

    photos_table.update(UpdateOption.EMPTY_SUBFIELDS_ONLY, new_image_records)
    photos_table.flush_print_changes()

    if not dry_run:
        stylists_table.save()
        photos_table.save()

def photos_add_new(dry_run: bool = False) -> None:
    project_paths = ProjectPaths()
    
    stylists_table = DatabaseTable(
        project_paths.get_data_path(STYLISTS_DB_DIR_NAME) / STYLISTS_DB_FILE_NAME,
        STYLISTS_DB_PK,
    )
    photos_table = DatabaseTable(
        project_paths.get_data_path(PHOTOS_DB_DIR_NAME) / PHOTOS_DB_FILE_NAME,
        PHOTOS_DB_PK
    )

    new_image_records = []
    for stylist_dir in project_paths.get_public_path(
        STYLISTS_PUBLIC_DIR_NAME
    ).iterdir():
        if stylist_dir.is_dir():
            images = [
                path
                for path in stylist_dir.iterdir()
                if not path.is_dir() and path.suffix in PICTURE_EXTENSION_LIST
            ]

            for image in images:
                image_record = {
                    PHOTOS_DB_PK: "/" + str(Path.relative_to(image, project_paths.get_public_path(""))),
                    "creator": (stylists_table == stylist_dir.name)["creator"][0] or "UNKNOWN",
                    "imageFileName": image.name,
                    "stylistPath": str(Path.relative_to(stylist_dir, project_paths.get_public_path(""))),
                    "stylistTitle": stylist_dir.name.replace("-", " ").title(),
                    "stylistTitleSystemName": stylist_dir.name,
                    "stylistDirName": stylist_dir.name,
                }
                metadata, success, error = MetaData(image)()
                print_errors(error, image.name)
                image_record.update(metadata)
                new_image_records.append(image_record)
        
            stylists_table.update(UpdateOption.SUBFIELD_OVERWRITE, [{
                STYLISTS_DB_PK: stylist_dir.name,
                "photoCount" : len(images)
            }])
            stylists_table.flush_print_changes()

    photos_table.update(UpdateOption.SUBFIELD_OVERWRITE, new_image_records)
    photos_table.flush_print_changes()

    if not dry_run:
        stylists_table.save()
        photos_table.save()

def stylists_add_new(dry_run: bool = False) -> None:
    """
    Update Stylists Table by referencing the stylsits folders in the public directory.
    Only add metadata if record already exists in the table.
    Otherwise add metadata and primary key

    Args:
        dry_run (bool, optional): Whether to save the changes or not. Defaults to False.
    """

    project_paths = ProjectPaths()
    stylists_db_path = (
        project_paths.get_data_path(STYLISTS_DB_DIR_NAME) / STYLISTS_DB_FILE_NAME
    )
    stylists_table = DatabaseTable(stylists_db_path, STYLISTS_DB_PK)

    new_records = []

    for stylist_dir in project_paths.get_public_path(
        STYLISTS_PUBLIC_DIR_NAME
    ).iterdir():
        if stylist_dir.is_dir() and any(stylist_dir.iterdir()):
            stylist_record = {
                STYLISTS_DB_PK: stylist_dir.name,
            }

            metadata, success, error = MetaData(stylist_dir)()
            print_errors(error, stylist_dir.name)

            stylist_record.update(metadata)
            new_records.append(stylist_record)

    stylists_table.update(UpdateOption.SUBFIELD_APPEND_ONLY, new_records)

    if not dry_run:
        stylists_table.save()
    elif ENV == "DEV":
        stylists_table.print_changes()

def print_errors(errors: list, identifier) -> None:
    if len(errors) > 0:
        for err in errors:
            plog(
                f"{colored('[ERROR][METADATA-CREATION]', 'light_red')} {err} for {identifier}"
            )
