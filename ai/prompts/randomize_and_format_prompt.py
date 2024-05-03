import markdown
import os
import random
from termcolor import colored


def parse_markdown_file(
    filename,
    surround_items_with_quoutes=False,
    separate_items_with_commas=False,
    sufs_prex=None,
    exclude_words=[],
    gender="female"
):

    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()

    content = content.replace(". ", "").replace("!", "").replace("?", "").replace(";", "").replace("“", "").replace("”", "").replace("‘", "").replace("’", "").replace('"', "").replace("…", "").replace(". . .", "")
    for word in exclude_words:
        content = content.replace(word, "")
    gender_words = [
        (" woman ", " man "),
        (" woman's ", " man's "),
        (" womans ", " mans "),
        (" female ", " male "),
        ("croptop", "sleeveless"),
        ("crop-top", "sleeveless"),
        ("crop top", "sleeveless"),
        (" dress ", " coat "),
        (" skirt ", " shorts "),
        ("cropped top", "sleeveless"),
        ("cropped-top", "sleeveless"),
        ("croppedtop", "sleeveless"),
        (" high heels ", " sneakers "),
        (" high-heels ", " sneakers "),
        (" highheels ", " sneakers "),
        (" high-heel ", " sneaker "),
    ]
    for terms in gender_words:
        if gender == "female":
            content = content.replace(terms[1], terms[0])
        elif gender == "male":
            content = content.replace(terms[0], terms[1])
    sections = {}
    current_section = None
    lines = content.split("\n")

    for index, line in enumerate(lines):
        if line.startswith("# "):  # tier-1 heading
            if current_section is not None:
                sections[current_section] = "\n".join(current_lines)
            current_section = line[2:].strip()
            current_lines = []
        else:
            if current_section is not None:
                if len(line.strip("\n").strip()) > 0:
                    if sufs_prex is not None and current_section in sufs_prex:
                        if sufs_prex[current_section][0]:
                            line = f"{sufs_prex[current_section][0]} {line}"
                        if sufs_prex[current_section][1]:
                            line = f"{line} {sufs_prex[current_section][1]}"
                    if surround_items_with_quoutes and current_section != "Subject":
                        if " " in line.strip():
                            if not line.strip().startswith(
                                "["
                            ) and not line.strip().startswith("("):
                                line = f'"{line}"'
                    if separate_items_with_commas and current_section != "Subject":
                        # not if it's the last line
                        if index < len(lines) - 1:
                            line = line + ","

                    current_lines.append(line)

    # Add the last section
    if current_section is not None:
        sections[current_section] = "\n".join(current_lines)

    return sections


def randomly_remove_items(sections, weights):
    """
    Randomly remove items from the sections based on the given weights.

    Args:
        sections: A dictionary of section titles and their contents.
        weights: A dictionary of section titles and the percentage chance (out of 100)
            that any individual item will be removed.

    """

    # Check if there are sections which dont have weights and alert user
    for section in sections:
        if section not in weights:
            print(
                f"{colored('[WARNING]', 'red')}: Section '{colored(section, 'green')}' does not have a weight assigned to it"
            )
            print(
                f"{colored('[WARNING]', 'red')}:     Its items wont be included until you add a weight for it in the 'selection_weights' dictionary.\n"
            )
    ret = {}
    sizes = {}
    for title, content in sections.items():
        if title in weights:
            new_content = ""
            lines = content.split("\n")
            # Randomize order of lines
            random.shuffle(lines)
            for line in lines:
                if random.randint(0, 100) > weights[title][0]:
                    sizes[title] = sizes.get(title, 0)
                    if weights[title][1] == None or sizes[title] < weights[title][1]:
                        new_content += line + " "
                        sizes[title] += 1

            ret[title] = new_content

    return ret

def reorder_sections(sections, tiers):
    """
    Reorder the sections based on the given section_tiers.
    Those sections which share the same tier will be randomized/shuffled.

    Args:
        sections: A dictionary of section titles and their contents.
        section_tiers: A dictionary of section titles and their tier.

    """
    # Create a dictionary of tiers and their sections
    for title in sections.keys():
        if title not in tiers.keys():
            print(
                f"{colored('[WARNING]', 'red')}: Section '{colored(title, 'green')}' does not have a tier assigned to it"
            )
            print(
                f"{colored('[WARNING]', 'red')}:     It wont be included until you add a tier for it in the 'section_tiers' dictionary.\n"
            )

    for title in tiers.keys():
        if title not in sections.keys():
            print(
                f"{colored('[WARNING]', 'red')}: Section '{colored(title, 'green')}' does not have any content"
            )
            print(
                f"{colored('[WARNING]', 'red')}:     It wont be included until you add some content for it in the markdown file.\n"
            )
    ret_sections = {}
    tiers_dict = {}

    for title, tier in tiers.items():
        if tier not in tiers_dict:
            tiers_dict[tier] = []
        tiers_dict[tier].append(title)
    
    # Randomize the sections within each tier
    for tier, section_titles in tiers_dict.items():
        random.shuffle(section_titles)
    
    # create ret_sections by selecting sections in order of their tier
    tiers_dict = dict(sorted(tiers_dict.items(), key=lambda item: item[0]))
    for tier, section_titles in tiers_dict.items():
        for title in section_titles:
            ret_sections[title] = sections[title]

    return ret_sections


if __name__ == "__main__":
    # -----------------------
    # USER INPUTS
    # -----------------------

    styles = [
        # (filename, +/- chance to remove item per section)
        ("athleisure", 12),
        ("clean-girl", 12),
    ]
    selection_weights = {
        # Section Title: (Chance (out of 100) to remove an item, Maximum items limit)
        "Subject": (1, 0),
        "Tops": (63, 1),
        "Fullbody" : (72, 1),
        "Outerwear" : (70, 1),
        "Bottoms": (65, 1),
        "Eyewear": (77, 0),
        "Hair": (72, 1),
        "Headwear": (76, 1),
        "Jewelry": (85, 1),
        "Makeup": (73, 1),
        "Accessories": (70, 1),
        "Footwear": (72, 1),
        "Medium": (25, 0),
        "Fit": (63, 1),
        "Colors": (63, 2),
        "Themes": (68, 2),
        "Setting": (81, 0),
        "Loras" : (0, 0),
        "Artist" : (78, 0),
        "Materials/Patterns" : (68, 1),
    }
    suffix_prefix = {
        "Subject": ("", ""),
        "Tops": ("wearing", ""),
        "Bottoms": ("wearing", ""),
        "Fullbody": ("wearing", ""),
        "Outerwear": ("wearing", ""),
        "Footwear": ("wearing", ""),
        "Jewelry": ("wearing", ""),
        "Headwear": ("wearing", ""),
        "Accessories": ("wearing", ""),
        "Eyewear": ("wearing", ""),
        "Makeup": ("", "makeup"),
        "Hair": ("with a", ""),
        "Colors" : ("", "colored clothes"),
    }
    section_tiers = {
        "Subject": -1,
        "Medium": -1,
        "Fullbody": 0,
        "Outerwear": 0,
        "Tops": 0,
        "Bottoms": 0,
        "Hair": 0,
        "Headwear": 0,
        "Jewelry": 0,
        "Accessories": 0,
        "Materials/Patterns": 0,
        "Footwear": 0,
        "Eyewear": 2,
        "Makeup": 1,
        "Fit": 0,
        "Artist" : 0,
        "Setting": 0,
        "Colors": 1,
        "Themes": 0,
        "Loras": 6,
    
    }
    exclude_words = [
        "fullbody", "full body", "full-body", "slr", "selfie", "candid instagram style photo"
    ]
    # forced_preamble = "8k octane detailed render, dim volumetric cinematic lighting, fashion photography,  fashion magazine trending, sharp, 8k, Photo from a preppy-athleisure fashion photoshoot of a man, street fashion, male model modeling the latest sophisticated preppy athleisure line of clothes, man, guy, male\n\n"
    # forced_preamble = "head-to-toe, from headwear to footwear, sharp, dim volumetric cinematic lighting, full frame, all-encompassing view, wide-angle, professional photography, realistic beauty,  photorealistic, fashion magazine photoshoot, fullbody, long shot, depth of field, high resolution, Fashion photoshoot,  Fashion photoshoot, 8k octane detailed render, no blur, professional photography, full shot, Photo of Adele in a crocheted retrofuturism outfit walking around outside, street fashion, complete ensemble, full outfit in frame"
    forced_preamble = ""
    surround_items_with_quoutes = False
    separate_items_with_commas = True
    add_suffix_and_prefix = True
    gender = "female"

    # -----------------------

    per_style = []
    for style_data in styles:
        style, weight = style_data
        weights_copy = selection_weights.copy()
        for weights in weights_copy:
            weights_copy[weights] = (weights_copy[weights][0] + weight, weights_copy[weights][1])

        style_dir_path = (
            "/home/c_byrne/school/courses/game310/final-project/wardrobe/prompts/styles"
        )
        filename = os.path.join(style_dir_path, style + ".md")
        sections = parse_markdown_file(
            filename,
            surround_items_with_quoutes,
            separate_items_with_commas,
            suffix_prefix if add_suffix_and_prefix else None,
            exclude_words,
            gender
        )
        discriminated_sections = randomly_remove_items(sections, weights_copy)
        discriminated_sections = reorder_sections(discriminated_sections, section_tiers)
        per_style.append(discriminated_sections)
    
    combined = {}
    for style in per_style:
        for title, content in style.items():
            if title not in combined:
                combined[title] = ""
            
            if title == "Subject":
                if combined[title] == "":
                    combined[title] = content
                elif random.randint(0, 1) == 0:
                    combined[title] = content
                continue
            # roll a dice to decide which goes first
            if random.randint(0, 1) == 0:
                combined[title] += content + " "
            else:
                combined[title] = content + " " + combined[title]

    all_content_split_by_2_newlines = forced_preamble + "\n\n".join(
        [
            content
            for _, content in combined.items()
            if len(content.strip("\n").strip()) > 1
        ]
    ).strip("\n")
    print(all_content_split_by_2_newlines)
    # Newlines are removed by the automatic1111 tokenizer anyway
    # all_content_split_by_2_newlines = all_content_split_by_2_newlines.replace("\n", " ")
    os.system(f'echo "{all_content_split_by_2_newlines}" | clipboard')
