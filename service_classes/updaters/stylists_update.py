import json
import random
from faker import Faker
from pathlib import Path
import time

from service_classes.paths import ProjectPaths
from service_classes.constants import (
    STYLISTS_PUBLIC_DIR_NAME,
    STYLISTS_DB_PK,
    ENV,
)
from service_classes.metadata import MetaData
from service_classes.enums.options import UpdateOption
from service_classes.logging.log_ import plog, print_errors
from service_classes.updaters.updaters_utils import UpdatersUtils
from service_classes.updaters.field_value_generators import FieldGenerator

from typing import Any, List, Union


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

    existing_primary_keys = stylists_table[STYLISTS_DB_PK]
    new_records = []
    new_primary_keys = []

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
        if stylist_dir.name not in existing_primary_keys:
            new_primary_keys.append(stylist_dir.name)

    stylists_table.update(UpdateOption.SUBFIELD_APPEND_ONLY, new_records)

    if dry_run and ENV == "DEV":
        stylists_table.print_changes()
    else:
        stylists_table.save()

    # Populate new records only
    populate_empty_stylists_fields(dry_run=dry_run, only=new_primary_keys)


def populate_empty_stylists_fields(
    dry_run: bool = False, only: Union[bool, List[Any]] = False
) -> None:
    """
    Populate empty fields in the Stylists Table with default values.

    Args:
        dry_run (bool, optional): Whether to save the changes or not. Defaults to False.
    """
    fake = Faker()
    ran_generator = FieldGenerator()
    project_paths = ProjectPaths()
    stylists_table = UpdatersUtils.get_stylists_table()
    users_table = UpdatersUtils.get_users_table()
    user_name_vals = users_table["name"]

    overwrite_records = []
    append_records = []
    fill_empty_records = []

    count = 0
    for stylist_dir in project_paths.get_public_path(
        STYLISTS_PUBLIC_DIR_NAME
    ).iterdir():
        if only and stylist_dir.name not in only:
            continue
        if stylist_dir.is_dir():
            time_start = time.time()
            bounty = ran_generator.bounty(stylists_table)

            # Tags generated from img2txt on the stylist's pictures
            stylist_tags = ran_generator.stylist_tags(stylist_dir, max_pictures=5)
            # First 6 tags can go to the requirements field
            requirements = list(stylist_tags)[:6]
            # Next 3 tags can go to the badges field
            if len(stylist_tags) > 6:
                badges = list(stylist_tags)[6:9]
            else:
                badges = list(stylist_tags)
            badges = ran_generator.append_emojis_to_tags(
                set(badges), max_emojis=2, remove_duplicates=True
            )
            badges.update(
                ran_generator.random_tags()
            )  # Pad with random tags from master list
            # Remaining tags can go to the description field
            if len(stylist_tags) > 9:
                description = ", ".join(list(stylist_tags)[9:])
            else:
                description = ran_generator.description()

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
                "communityUnlock": ran_generator.community_unlock(bool(bounty)),
                "bounties": bounty,
                "badges": list(badges),
            }

            stylist_overwrite_record = {
                STYLISTS_DB_PK: stylist_dir.name,
                "title": stylist_dir.name.replace("-", " ").title(),
                "imageSrc": "/"
                + str(Path.relative_to(grid_file, project_paths.get_public_path(""))),
                "description": (
                    description
                    if description
                    else "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                ),
            }
            cur_record = stylists_table == stylist_dir.name
            if cur_record["creator"][0] not in ["Kate Mercer", "Lady Bird"]:
                stylist_overwrite_record["creator"] = user_name_vals.sample(1)[0]

            stylist_append_record = {
                STYLISTS_DB_PK: stylist_dir.name,
                # "comments": ran_generator.random_comments(),
                "tags": list(stylist_tags),
                "requirements": requirements,
            }

            metadata, success, error = MetaData(stylist_dir)()
            print_errors(error, stylist_dir.name)

            stylist_overwrite_record.update(metadata)

            overwrite_records.append(stylist_overwrite_record)
            append_records.append(stylist_append_record)
            fill_empty_records.append(stylist_fill_empty_record)

            time_remaining = (time.time() - time_start) * (len(stylists_table) - count)
            readable_time_remaining = (
                f"{time_remaining // 60:.1f} min {time_remaining % 60:.1f} sec"
            )
            plog(f"\nUpdated {count}/{len(stylists_table)} Records")
            plog(f"Time Taken to populate record: {time.time() - time_start:.1f} sec")
            plog(f"Time Remaining to finish table: ~{readable_time_remaining}\n")

        count += 1
        if time_remaining > 3 * 60 and count % 4 == 0:
            plog("Pausing For heat dissipation...\n\n")
            time.sleep(20)

    stylists_table.update(UpdateOption.EMPTY_SUBFIELDS_ONLY, fill_empty_records)
    stylists_table.update(UpdateOption.SUBFIELD_OVERWRITE, overwrite_records)
    stylists_table.update(UpdateOption.SUBFIELD_APPEND_ONLY, append_records)

    if dry_run and ENV == "DEV":
        stylists_table.print_changes()
    else:
        stylists_table.save()
