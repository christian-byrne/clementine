# from service_classes.updaters.stylists_update import (
#     add_new_stylists,
#     populate_empty_stylists_fields,
# )
# from service_classes.updaters.photos_update import (
#     populate_empty_photo_fields,
#     add_new_photos,
# )
# from service_classes.updaters.styles_update import (
#     populate_style_photos,
#     del_removed_images_from_photos_fields,
#     add_new_images_to_photos_fields,
# )
# from service_classes.updaters.updaters_utils import UpdatersUtils
# from service_classes.updaters.items_update import add_new_items
from service_classes.get_all_db_fields import (
    json_table_to_create_table_sql_cmd,
    destructure_jsonb_field,
    add_id_col,
    replace_model_names_with_ids,
    convert_avg_rating_to_float,
    find_records_that_lack_all_fields,
    replace_empty_jsonb_with_null,
    check_if_duplicate_primary_keys,
    lowercase_all_keys,
    add_creator_id_to_photos
)
from service_classes.constants import USERS_DB_DIR_NAME, USERS_DB_FILE_NAME, STYLISTS_DB_DIR_NAME, STYLISTS_DB_FILE_NAME, PHOTOS_DB_DIR_NAME, PHOTOS_DB_FILE_NAME, STYLES_DB_DIR_NAME, STYLES_DB_FILE_NAME, ITEMS_DB_DIR_NAME, ITEMS_DB_FILE_NAME
from service_classes.paths import ProjectPaths
import json

if __name__ == "__main__":
    project_paths = ProjectPaths()
    users_json_data = project_paths.get_data_path(PHOTOS_DB_DIR_NAME) / PHOTOS_DB_FILE_NAME 
    with open(users_json_data, "r") as f:
        data = json.load(f)

    json_table_to_create_table_sql_cmd(data)
    # check_if_duplicate_primary_keys(STYLISTS_DB_DIR_NAME, STYLISTS_DB_FILE_NAME, "id")
    # find_records_that_lack_all_fields(STYLES_DB_DIR_NAME, STYLES_DB_FILE_NAME)