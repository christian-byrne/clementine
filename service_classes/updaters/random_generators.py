import json
import random
from faker import Faker
import markovify
from pathlib import Path
import re


from service_classes.constants import PICTURE_EXTENSION_LIST
from service_classes.paths import ProjectPaths
from service_classes.table import DatabaseTable
from ai.img2txt.auto_caption import AutoCaptioner

from typing import List, Any, Set


class RanValueGenerator:
    MAX_TAG_LEN = 12  # in chars
    MAX_TAGS_PER_CAPTION = 5
    IMG2TXT_EXCLUDE_TERMS = [
        "the models are posing for",
        "posing for the camera",
        "fashion shoot",
        "posing for picture",
        "posing for a picture",
        "posing forpicture",
        "posing for a photo",
        "with blonde hair",
        "the models",
        "a woman",
        "dressed ",
        "style of",
        "photo of",
    ]
    REPLACE_WITH_COMMAS = [
        " and ",
        " or ",
        " with ",
        " in the " " in ",
        " on ",
        " by ",
        " for ",
        " wearing ",
        " are ",
        " at a ",
        " at ",
        " of ",
        " that ",
        " this ",
        " these ",
        " those ",
        " the ",
        " a ",
        " an ",
        " to ",
        " like ",
        " from ",
        " as ",
    ]

    def __init__(self) -> None:
        self.img2txt = AutoCaptioner(
            5, exclude_terms=RanValueGenerator.IMG2TXT_EXCLUDE_TERMS
        )
        self.fake = Faker()
        self.gamification_fields = RanValueGenerator.get_gamification_fields()
        self.corpus = " ".join(self.gamification_fields["description_corpus"])
        self.text_model = markovify.Text(self.corpus)

        self.tag_caption_args = [
            ("dressed in the style of ", 8, 16, 1.5, 1.2),
            # ("a fashion shoot for ", 8, 16, 0.9, 1.2),
            ("the models are wearing ", 7, 16, 1, 1.2),
            # ("fashion style reminscent of ", 8, 16, 1.1, 1.2),
            ("photo of woman wearing clothes inspired by ", 8, 16, 1.1, 1.2),
            ("photo of clothes that go great with ", 8, 16, 1.5, 1.2),
            # ("clothing and acessories in the style of ", 1, 3, 0.8, 1.5),
            # ("look your best wearing ", 40, 80, 0.5, 1.5),
        ]

    @staticmethod
    def get_gamification_fields() -> dict:
        """
        Return a dictionary of gamification fields with default values.

        Returns:
            dict: Gamification fields with default values.
        """
        project_paths = ProjectPaths()
        json_path = project_paths.get_db_handlers_path(
            "updaters/gamification-field-values.json"
        )
        with open(json_path, "r") as f:
            return json.load(f)

    def stylist_tags(
        self, stylist_dir: Path, max_pictures: int = 16, max_resolution: int = 512
    ):
        images = [
            img
            for img in stylist_dir.iterdir()
            if img.is_file() and img.suffix in PICTURE_EXTENSION_LIST
        ]
        tags = set()
        count = 0
        for img in images:
            if count >= max_pictures:
                break
            tags.update(self.picture_tags(img))
            count += 1

        return tags

    def picture_tags(self, img_path: Path) -> Set[str]:
        return self.__gen_tags(self.tag_caption_args[:], set(), img_path)

    def __gen_tags(
        self, arg_list: List[Any], all_tags: Set, img_path: Path
    ) -> Set[str]:
        if not arg_list:
            return all_tags

        caption = self.img2txt(
            img_path,
            arg_list[0][0],
            arg_list[0][1],
            arg_list[0][2],
            arg_list[0][3],
            arg_list[0][4],
            include_conditional_caption=False,
        )
        # Fix multiple consecutive spaces
        caption = re.sub(r"\s+", " ", caption).strip()
        # Pad with spaces on both sides
        caption = f" {caption} "
        # Replace prepositions fragments with commas
        for replace in RanValueGenerator.REPLACE_WITH_COMMAS:
            caption = caption.replace(replace, ",")
        # Split on commas
        tags = caption.split(", ")
        # Delete empty strings
        tags = [tag for tag in tags if tag and tag != " "]
        # Process tags
        tags = self.__split_long_tags(tags)
        tags = [tag.strip().strip(",").strip() for tag in tags]

        all_tags.update(tags)
        return self.__gen_tags(arg_list[1:], all_tags, img_path, *arg_list[0])

    def __split_long_tags(self, tags: List[str]) -> List[str]:
        new_tags = []
        i = 0
        while i < len(tags) and i < RanValueGenerator.MAX_TAGS_PER_CAPTION:
            if len(tags[i]) > RanValueGenerator.MAX_TAG_LEN:
                # Find the index of the last word that fits
                last_word_index = 0
                split_tag = tags[i].split(" ")
                for index, word in enumerate(split_tag):
                    if (
                        len(" ".join(split_tag[: index + 1]))
                        > RanValueGenerator.MAX_TAG_LEN
                    ):
                        break
                    last_word_index = index
                # Add the tag to the final tags
                new_tags.append(" ".join(split_tag[: last_word_index + 1]).strip())
            else:
                new_tags.append(tags[i].strip())

    def description(self) -> str:
        res = self.text_model.make_sentence(
            tries=100,
            max_overlap_ratio=0.7,
            max_overlap_total=15,
            min_words=5,
            max_words=20,
        )
        if not res:
            return self.fake.text(max_nb_chars=200)

    def community_unlock(self, has_bounty):
        # n% chance to have a community unlock, unless it has a bounty, then 0%
        has_community_unlock = (
            random.choices([True, False], weights=[60, 40])[0]
            if not has_bounty
            else False
        )
        if not has_community_unlock:
            return {}

        goal = round(random.randint(20, 950) / 50) * 50
        has_completed = random.choices([True, False], weights=[35, 65])[0]
        if has_completed:
            progress = goal
            message = "UNLOCKED \ud83c\udf89 for all Users"
        else:
            progress = random.randint(0, goal - 1)
            message = f"{goal - progress} more rubies to unlock for all users!"
        return {"goal": goal, "progress": progress, "message": message}

    def bounty(self, stylists_table: DatabaseTable):
        has_bounty = random.choices([True, False], weights=[22, 78])[0]
        if not has_bounty:
            return {}

        bounty_task = random.choice(self.gamification_fields["bounty_tasks"])
        if "$MODEL" in bounty_task:
            bounty_task = bounty_task.replace(
                "$MODEL", stylists_table["title"].sample(1)[0]
            )
        bounty = {
            "status": "BOUNTY AVAILABLE",
            "message": bounty_task,
            # reward should be a random number between 20 and 950 rounded to the nearest 50
            "reward": round(random.randint(20, 950) / 50) * 50,
        }
        return bounty

    def random_tags(self):
        num_badges = random.choices([0, 1, 2, 3, 4], weights=[8, 32, 27, 18, 15])[0]
        selected_badges = random.sample(self.gamification_fields["tags"], num_badges)
        return selected_badges
