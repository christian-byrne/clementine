from converters.md_to_json import convert
from paths import ProjectPaths


def main():
    project_paths = ProjectPaths()

    convert(
        project_paths.get_ai_path("prompts/styles"),
        "styles.json",
        exclude_list=["template.md"],
    )


if __name__ == "__main__":
    main()
