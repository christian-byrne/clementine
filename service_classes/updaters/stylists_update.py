import json
import random
from faker import Faker
from pathlib import Path

from service_classes.paths import ProjectPaths
from service_classes.constants import (
    STYLISTS_PUBLIC_DIR_NAME,
    STYLISTS_DB_PK,
    ENV,
    USERS_DB_PK
)
from service_classes.table import DatabaseTable
from service_classes.metadata import MetaData
from service_classes.enums.options import UpdateOption
from service_classes.logging.log_ import plog, print_errors
from service_classes.updaters.updaters_utils import UpdatersUtils
from service_classes.updaters.random_generators import RanValueGenerator


def add_new_stylists(dry_run: bool = False) -> None:
    """
    Update Stylists Table by referencing the stylsits folders in the public directory.
    Only add metadata if record already exists in the table.
    Otherwise add metadata and primary key

    Args:
        dry_run (bool, optional): Whether to save the changes or not. Defaults to False.
    """
    project_paths = ProjectPaths()
    stylists_table = UpdatersUtils.get_stylists_table()

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

    if dry_run and ENV == "DEV":
        stylists_table.print_changes()
    else:
        stylists_table.save()


def populate_empty_stylists_fields(dry_run: bool = False) -> None:
    """
    Populate empty fields in the Stylists Table with default values.

    Args:
        dry_run (bool, optional): Whether to save the changes or not. Defaults to False.
    """
    fake = Faker()
    ran_generator = RanValueGenerator()
    project_paths = ProjectPaths()
    stylists_table = UpdatersUtils.get_stylists_table()
    users_table = UpdatersUtils.get_users_table()
    user_name_vals = users_table["name"]

    overwrite_records = []
    append_records = []
    fill_empty_records = []

    for stylist_dir in project_paths.get_public_path(
        STYLISTS_PUBLIC_DIR_NAME
    ).iterdir():
        if stylist_dir.is_dir():
            bounty = ran_generator.bounty(stylists_table)

            # Fallback name
            grid_file = project_paths.get_public_path(
                f"{STYLISTS_PUBLIC_DIR_NAME}/{stylist_dir.name}/grid-2x2.png"
            )
            for image_file in stylist_dir.iterdir():
                if image_file.is_file() and "grid" in image_file.name:
                    grid_file = image_file

            stylist_fill_empty_record = {
                STYLISTS_DB_PK: stylist_dir.name,
                "likes": random.randint(0, 1000),
                "favorites": random.randint(0, 1000),
                "downloads": random.randint(0, 1000),
                "shared": random.randint(0, 1000),
                "views": random.randint(0, 100000),
                "dateCreated": fake.date_this_year().strftime("%B %d, %Y"),
            }

            stylist_overwrite_record = {
                STYLISTS_DB_PK: stylist_dir.name,
                "title": stylist_dir.name.replace("-", " ").title(),
                "imageSrc": "/"
                + str(Path.relative_to(grid_file, project_paths.get_public_path(""))),
                "bounties": bounty,
                "description": ran_generator.description(),
            }
            cur_record = stylists_table == stylist_dir.name
            if cur_record["creator"][0] == "UNKNOWN":
                stylist_overwrite_record["creator"] = user_name_vals.sample(1)[0]
            
            stylist_append_record = {
                STYLISTS_DB_PK: stylist_dir.name,
                # "comments": ran_generator.random_comments(),
                "requirements": "Lorem, ipsum dolor.",
                "badges": ran_generator.random_tags(),
                "communityUnlock": ran_generator.community_unlock(bool(bounty)),
            }

            metadata, success, error = MetaData(stylist_dir)()
            print_errors(error, stylist_dir.name)

            stylist_overwrite_record.update(metadata)
            
            overwrite_records.append(stylist_overwrite_record)
            append_records.append(stylist_append_record)
            fill_empty_records.append(stylist_fill_empty_record)

    stylists_table.update(UpdateOption.EMPTY_SUBFIELDS_ONLY, fill_empty_records)
    stylists_table.update(UpdateOption.SUBFIELD_OVERWRITE, overwrite_records)
    stylists_table.update(UpdateOption.SUBFIELD_APPEND_ONLY, append_records)
    
    if dry_run and ENV == "DEV":
        stylists_table.print_changes()
    else:
        stylists_table.save()
