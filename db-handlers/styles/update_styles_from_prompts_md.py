from md_to_json import main


TARGET_DIR = "../prompts/styles"
OUTPUT_FILENAME = "styles.json"
EXCLUDE_LIST = [
    "template.md",
]

main(
    TARGET_DIR,
    OUTPUT_FILENAME,
    exclude_list=EXCLUDE_LIST,
)
