import json
import os

TARGET_DIR = "../prompts/styles"
EXCLUDE_LIST = [
    "template.md",
]

def markdown_to_json(markdown_file):
    json_data = {
        "title": markdown_file.split("/")[-1].replace(".md", ""),
    }

    with open(markdown_file, "r") as f:
        lines = f.readlines()
        current_title = None
        current_content = []
        for line in lines:
            if line.startswith("#"):
                if current_title is not None:
                    json_data[current_title] = current_content
                    current_content = []
                current_title = line.strip("#").strip()
            elif current_title is not None:
                if (
                    line.strip() == ""
                    or line.startswith("---")
                    or line.strip() == "\n"
                    or line.strip() == "\r\n"
                ):
                    continue
                current_content.append(line.strip())
        if current_title is not None:
            json_data[current_title] = current_content

    return json_data


def save_to_json(json_data, output_file):
    output_dir = "md-to-json-output"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    output_file = os.path.join(output_dir, output_file)
    with open(output_file, "w") as f:
        json.dump(json_data, f, indent=4)


def get_all_md_in_dir(directory):
    all_md_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".md") and file not in EXCLUDE_LIST:
                all_md_files.append(os.path.join(root, file))
    return all_md_files


if __name__ == "__main__":
    all_md_files = get_all_md_in_dir(TARGET_DIR)
    for md_file in all_md_files:
        json_data = markdown_to_json(md_file)
        output_filename = os.path.basename(md_file).replace(".md", ".json")
        save_to_json(json_data, output_filename)
