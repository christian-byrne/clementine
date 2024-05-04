import json
import random
from faker import Faker
import markovify
from pathlib import Path

from service_classes.paths import ProjectPaths
from service_classes.table import DatabaseTable
from ai.img2txt.auto_caption import AutoCaptioner


class RanValueGenerator:
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

    def __init__(self) -> None:
        self.img2txt = AutoCaptioner(5, exclude_terms=RanValueGenerator.IMG2TXT_EXCLUDE_TERMS)
        self.fake = Faker()
        self.gamification_fields = RanValueGenerator.get_gamification_fields()
        self.corpus = " ".join(self.gamification_fields["description_corpus"])
        self.text_model = markovify.Text(self.corpus)

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

    def picture_tags(img_path: Path)

    def description(self) -> str:
        res = self.text_model.make_sentence(
            tries=100, max_overlap_ratio=0.7, max_overlap_total=15,
            min_words=5, max_words=20
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
