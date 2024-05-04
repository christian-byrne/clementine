import os
from pathlib import Path
import time
from duckduckgo_search import DDGS
from fastdownload import download_url
from fastcore.all import *
from service_classes.paths import ProjectPaths
from service_classes.logging.log_ import plog

from typing import List, Tuple


class DuckDuckGoImageScraper:
    def __init__(
        self,
        dl_path: Path,
        sleep_interval: float = 10.0,
        timout: int = 10,
    ):
        self.dl_path = dl_path
        self.sleep_interval = sleep_interval
        self.timeout = timout
        self.project_paths = ProjectPaths()

    def get_dl_path(self) -> Path:
        return self.dl_path

    def scrape(
        self, category: str, search_phrases: List[Tuple[str, int]]
    ) -> List[dict]:
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
                "download_path": (str) full path to the downloaded image
                "imageSrc": (str) relative path to the downloaded image from the public directory
            },...]
        """
        ret = []
        for phrase, limit in search_phrases:
            downloaded_photos = self.__search_scrape_images(phrase, limit)
            ret += downloaded_photos
            time.sleep(self.sleep_interval)
        return ret

    def search_images(self, search_phrase: str, max_images: int = 30) -> List[dict]:
        with DDGS() as ddg:
            results = ddg.images(keywords=search_phrase)
            # Only return up to max_images
            truncated = results[:max_images]
            return L(truncated)

    def __search_scrape_images(self, search_phrase, max_images: int = 30) -> List[dict]:
        image_results = self.search_images(search_phrase, max_images)

        for index, result in enumerate(image_results):
            increment = 1
            filename = f"{index+increment}{Path(result['image']).suffix}"

            while os.path.exists(self.dl_path / filename):
                increment += 1
                filename = f"{index+increment}{Path(result['image']).suffix}"

            photo_dl_path = self.dl_path / filename

            try:
                res_dl_path = download_url(
                    result["image"],
                    photo_dl_path,
                    timeout=self.timeout,
                    show_progress=False,
                )
            except Exception as e:
                plog(f"Failed to download image {index + 1} of {len(image_results)}\n")
                plog(f"Error: {e}")
                continue

            plog(f"Downloaded image to {res_dl_path}")
            result["download_path"] = str(photo_dl_path.resolve())
            result["imageSrc"] = Path.relative_to(
                photo_dl_path, self.project_paths.get_public_path("")
            )

        plog(f"Images downloaded successfully to {self.dl_path}")

        return image_results
