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
    STYLES_PUBLIC_DIR_NAME,
    PICTURE_EXTENSION_LIST,
    STYLES_DB_PK
)
from service_classes.metadata import MetaData
from service_classes.enums.options import UpdateOption
from service_classes.logging.log_ import plog, print_errors
from service_classes.updaters.updaters_utils import UpdatersUtils
from service_classes.updaters.field_value_generators import FieldGenerator
from service_classes.web_scrapers.scrape_ddg_images import DuckDuckGoImageScraper

from typing import Any, List, Union


def populate_style_photos(if_existing_less_than: int = 6) -> None:
    styles_table = UpdatersUtils.get_styles_table()

    for style in styles_table:
        need_photos = if_existing_less_than
        style_img_dir = (
            ProjectPaths().get_public_path(STYLES_PUBLIC_DIR_NAME)
            / style[STYLES_DB_PK]
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
            scraped_images = get_scraped_images(style[ST])
            new_record = {
                STYLES_DB_PK: style[STYLES_DB_PK],
                "images": scraped_images,
            }
                


def get_scraped_images(style_name: str, count: int):
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
        (style_name, count),
    ]
    scraper = DuckDuckGoImageScraper(
        dl_path=project_paths.get_public_path(STYLES_PUBLIC_DIR_NAME) / style_name,
        sleep_interval=5.0,
        timout=10,
    )
    return scraper.scrape(style_name, search_phrases)
