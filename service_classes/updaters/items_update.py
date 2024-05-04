from pathlib import Path
from PIL import Image

from service_classes.paths import ProjectPaths
from service_classes.constants import (
    STYLES_PUBLIC_DIR_NAME,
    PICTURE_EXTENSION_LIST,
    STYLES_DB_PK,
    ITEMS_DB_DIR_NAME,
    ITEMS_DB_FILE_NAME,
    ITEMS_DB_PK,
    ITEMS_PUBLIC_DIR_NAME
)
from service_classes.metadata import MetaData
from service_classes.enums.options import UpdateOption
from service_classes.logging.log_ import plog, print_errors
from service_classes.updaters.updaters_utils import UpdatersUtils
from service_classes.web_scrapers.scrape_ddg_images import DuckDuckGoImageScraper


def add_new_items(dry_run: bool = False) -> None:
    items_table = UpdatersUtils.get_items_table()

    new_records = []
    for image in ProjectPaths().get_public_path(ITEMS_PUBLIC_DIR_NAME).iterdir():
        if image.is_dir():
            continue

        if image.suffix not in PICTURE_EXTENSION_LIST:
            continue

        item = {
            "path" : str(image),
            "imageSrc": str(Path.relative_to(image, ProjectPaths().get_public_path(""))),
            "name": image.stem.replace("-", " ").capitalize(),
            "systemName": image.stem,
            "extension": image.suffix
        }
        new_records.append(item)

    items_table.update(
        UpdateOption.RECORD_APPEND_ONLY,
        new_records,
    )
    if not dry_run:
        items_table.flush_print_changes()
    else:
        items_table.save()
        