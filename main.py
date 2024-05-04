from service_classes.updaters.stylists_update import (
    add_new_stylists,
    populate_empty_stylists_fields,
)
from service_classes.updaters.photos_update import (
    populate_empty_photo_fields,
    add_new_photos,
)
from service_classes.updaters.random_generators import RanValueGenerator
from ai.img2txt.auto_caption import AutoCaptioner

from pathlib import Path
import re

if __name__ == "__main__":
    # add_new_stylists()
    # add_new_photos()
    # populate_empty_photo_fields()
    # populate_empty_stylists_fields()

    # rg = RanValueGenerator()
    # print(rg.description())
    test_pic_path = "/home/c_byrne/school/courses/game310/final-project/wardrobe/public/pictures/models/retrofuturism/retrofuturism-grid-2x2.png"
    test_pic_path = Path(test_pic_path)

    x = AutoCaptioner(5, exclude_terms=exclude_terms)
    conditional_captions = [
        ("dressed in the style of ", 8, 16, 1.5, 1.2),
        ("a fashion shoot for ", 8, 16, 0.9, 1.2),
        ("the models are wearing ", 7, 16, 1, 1.2),
        ("fashion style reminscent of ", 8, 16, 1.1, 1.2),
        ("photo of woman wearing clothes inspired by ", 8, 16, 1.1, 1.2),
        ("photo of clothes that go great with ", 8, 16, 1.5, 1.2),
        # ("clothing and acessories in the style of ", 1, 3, 0.8, 1.5),
        # ("look your best wearing ", 40, 80, 0.5, 1.5),
    ]
    final_tags = set()
    max_tag_length = 12  # in chars
    max_tags_per_phrase = 4
    replace_with_commas = [
        " and ",
        " or ",
        " with ",
        " in ",
        " on ",
        " by ",
        " for ",
        " wearing ",
        " are " " at a ",
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
    for conditional_caption in conditional_captions:
        caption = x(
            test_pic_path,
            conditional_caption[0],
            conditional_caption[1],
            conditional_caption[2],
            temperature=conditional_caption[3],
            repetition_penalty=conditional_caption[4],
            include_conditional_caption=False,
        )
        print(f"\n\n\nCaption from output: {caption}")

        # Fix multiple consecutive spaces
        caption = re.sub(r"\s+", " ", caption).strip()
        print(f"Caption after space replacement: {caption}")

        # Pad with spaces on both sides
        caption = f" {caption} "

        # Replace prepositions with commas
        for replace in replace_with_commas:
            caption = caption.replace(replace, ",")
        print(f"Caption after comma replacement: {caption}")

        # Split on commas
        tags = caption.split(", ")

        # Delete empty strings
        tags = [tag for tag in tags if tag and tag != " "]
        print(f"Tags before processing: {tags}")

        # Process tags
        i = 0
        while i < max_tags_per_phrase and i < len(tags):
            if len(tags[i]) > max_tag_length:
                # Split on a space
                split_tag = tags[i].split(" ")
                # Find the index of the last word that fits
                last_word_index = 0
                for index, word in enumerate(split_tag):
                    if len(" ".join(split_tag[: index + 1])) > max_tag_length:
                        break
                    last_word_index = index
                # Add the tag to the final tags
                final_tags.add(" ".join(split_tag[: last_word_index + 1]).strip())
            else:
                final_tags.add(tags[i].strip())
            i += 1

    print(f"\nfinal_tags: {final_tags}")
