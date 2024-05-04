import json
import random
from faker import Faker
from pathlib import Path
import time
from PIL import Image

from service_classes.paths import ProjectPaths
from service_classes.constants import (
    STYLISTS_PUBLIC_DIR_NAME,
    STYLISTS_DB_PK,
    ENV,
    STYLES_PUBLIC_DIR_NAME,
    PICTURE_EXTENSION_LIST,
    STYLES_DB_PK,
)
from service_classes.metadata import MetaData
from service_classes.enums.options import UpdateOption
from service_classes.logging.log_ import plog, print_errors
from service_classes.updaters.updaters_utils import UpdatersUtils
from service_classes.updaters.field_value_generators import FieldGenerator
from service_classes.web_scrapers.scrape_ddg_images import DuckDuckGoImageScraper

from typing import Any, List, Union


def add_new_images_to_photos_fields(dry_run: bool = False) -> None:
    styles_table = UpdatersUtils.get_styles_table()
    project_paths = ProjectPaths()
    new_records = []
    for style in styles_table:
        style_img_dir = (
            ProjectPaths().get_public_path(STYLES_PUBLIC_DIR_NAME) / style[STYLES_DB_PK]
        )
        existing_images_on_disk = [
            f for f in style_img_dir.iterdir() if f.is_file() and f.suffix in PICTURE_EXTENSION_LIST
        ]

        if "images" not in style:
            style["images"] = []
        new_images = []
        for image in existing_images_on_disk:
            img_pil = Image.open(image)
            new_images.append({
                "title": image.stem,
                "image": f"/{STYLES_PUBLIC_DIR_NAME}/{style[STYLES_DB_PK]}/{image.name}",
                "height": img_pil.height,
                "width": img_pil.width,
                "source": "local",
                "imageSrc" : str(Path.relative_to(
                image, project_paths.get_public_path("")
                )),
                "download_path": f"/{STYLES_PUBLIC_DIR_NAME}/{style[STYLES_DB_PK]}/{image.name}",
            })
          
        new_records.append({
            STYLES_DB_PK: style[STYLES_DB_PK],
            "images": new_images,
        })

    styles_table.update(UpdateOption.SUBFIELD_OVERWRITE, new_records)

    if not dry_run:
        styles_table.save()
    else:
        styles_table.flush_print_changes()

def del_removed_images_from_photos_fields(dry_run: bool = False) -> None:
    styles_table = UpdatersUtils.get_styles_table()
    new_records = []
    for style in styles_table:
        style_img_dir = (
            ProjectPaths().get_public_path(STYLES_PUBLIC_DIR_NAME) / style[STYLES_DB_PK]
        )
        existing_images_on_disk = [
            f for f in style_img_dir.iterdir() if f.is_file() and f.suffix in PICTURE_EXTENSION_LIST
        ]

        if "images" not in style:
            continue
        existing_images_in_db = style["images"]
        new_images_value = [
            img for img in existing_images_in_db if Path(img["download_path"]) in existing_images_on_disk
        ]
        if len(new_images_value) != len(existing_images_in_db):
            style["images"] = new_images_value
            new_records.append(style)

    styles_table.update(UpdateOption.SUBFIELD_OVERWRITE, new_records)

    if not dry_run:
      styles_table.save()
    else:
      styles_table.flush_print_changes()
            

def populate_style_photos(if_existing_less_than: int = 6) -> None:
    styles_table = UpdatersUtils.get_styles_table()

    new_records = []
    for style in styles_table:
        need_photos = if_existing_less_than
        style_img_dir = (
            ProjectPaths().get_public_path(STYLES_PUBLIC_DIR_NAME) / style[STYLES_DB_PK]
        )
        if style_img_dir and style_img_dir.is_dir():
            image_count = len(
                [
                    f
                    for f in style_img_dir.iterdir()
                    if f.is_file() and f.suffix in PICTURE_EXTENSION_LIST
                ]
            )
            need_photos = if_existing_less_than - image_count
        else:
            style_img_dir.mkdir(parents=True, exist_ok=True)

        if need_photos > 0:
            scraped_images = get_scraped_images(
                style[STYLES_DB_PK], f"{style[STYLES_DB_PK]} fashion trend", need_photos
            )
            new_record = {
                STYLES_DB_PK: style[STYLES_DB_PK],
                "images": scraped_images,
            }
            metadata, success, errors = MetaData(style_img_dir)()
            print_errors(errors, style[STYLES_DB_PK])
            new_record.update(metadata)

            new_records.append(new_record)

    styles_table.update(UpdateOption.SUBFIELD_OVERWRITE, new_records)


def get_scraped_images(style_name: str, search_term: str, count: int):
    """
    Scrapes images from the web based on the given search phrases.

    Args:
        search_phrases (List[Tuple[str, int]]): A list of tuples containing the search phrases and the limit of images to scrape for each phrase.

    Returns:
        List[dict]: [{
            "title": (str) Title of the image,
            "image": (str) URL of the image,
            "thumbnail": (str) URL of the thumbnail,
            "url": (str) URL of the page containing the image,
            "height": (int) Height of the image,
            "width": (int) Width of the image,
            "source": (str) Website source of the image,
            "download_path": (str) Path to the downloaded image
        },...]
    """
    project_paths = ProjectPaths()
    search_phrases = [
        (f"{search_term} fashion trend, items, styles", count // 2),
        (f"fashion styles {search_term} aesthetic", count // 2 if count % 2 == 0 else count // 2 + 1),
    ]
    scraper = DuckDuckGoImageScraper(
        dl_path=project_paths.get_public_path(STYLES_PUBLIC_DIR_NAME) / style_name,
        sleep_interval=5.0,
        timout=10,
    )
    return scraper.scrape(style_name, search_phrases)
