import json
import os


def convert(target_dir: str, output_filename: str, exclude_list: list = []):
    all_md_files = get_all_md_in_dir(target_dir, exclude_list)
    json_objects = []
    for md_file in all_md_files:
        json_data = markdown_to_json(md_file)
        json_objects.append(json_data)
        
    output_filename = output_filename + ".json" if not output_filename.endswith(".json") else output_filename
    save_to_json(json_objects, output_filename)

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


def save_to_json(json_data, output_filepath):
    with open(output_filepath, "w") as f:
        json.dump(json_data, f, indent=4)


def get_all_md_in_dir(directory, exclude_list=[]):
    all_md_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".md") and file not in exclude_list:
                all_md_files.append(os.path.join(root, file))
    return all_md_files
