import json
from service_classes.paths import ProjectPaths
from service_classes.constants import USERS_DB_DIR_NAME, USERS_DB_FILE_NAME, PHOTOS_DB_DIR_NAME, PHOTOS_DB_FILE_NAME
import hashlib

project_paths = ProjectPaths()

def add_creator_id_to_photos():
    with open(
        project_paths.get_data_path(USERS_DB_DIR_NAME) / USERS_DB_FILE_NAME, "r"
    ) as f:
        user_data = json.load(f)

    with open(
        project_paths.get_data_path(PHOTOS_DB_DIR_NAME) / PHOTOS_DB_FILE_NAME, "r"
    ) as f:
        photo_data = json.load(f)

    new_json_data = []

    for record in photo_data:
        if "creator" in record:
            for user_record in user_data:
                if record["creator"] == user_record["name"] or record["creator"] == user_record["nameSystem"] or record["creator"] == user_record["username"]:
                    record["creatorId"] = user_record["id"]
                    break
        new_json_data.append(record)
    
    with open(
        project_paths.get_data_path(PHOTOS_DB_DIR_NAME) / PHOTOS_DB_FILE_NAME, "w"
    ) as f:
        json.dump(new_json_data, f, indent=4)

def lowercase_all_keys(db_dirname: str, db_filename: str):
    db_path = project_paths.get_data_path(db_dirname) / db_filename
    with open(db_path, "r") as f:
        data = json.load(f)

    new_table = []
    for record in data:
        new_record = {}
        for key, value in record.items():
            new_record[key.lower()] = value
        new_table.append(new_record)

    new_db_path = str(db_path).replace(".json", "_lowercase.json")
    with open(new_db_path, "w") as f:
        json.dump(new_table, f, indent=4)

def check_if_duplicate_primary_keys(db_dirname: str, db_filename: str, primary_key: str):
    db_path = project_paths.get_data_path(db_dirname) / db_filename
    with open(db_path, "r") as f:
        data = json.load(f)

    primary_key_values = set()
    for record in data:
        if record[primary_key] in primary_key_values:
            print(f"Duplicate primary key: {record[primary_key]}")
        primary_key_values.add(record[primary_key])

def replace_empty_jsonb_with_null(db_dirname: str, db_filename: str, field_name: str):
    db_path = project_paths.get_data_path(db_dirname) / db_filename
    with open(db_path, "r") as f:
        data = json.load(f)

    new_table = []
    for record in data:
        if field_name in record:
            if not record[field_name] or record[field_name] == {} or record[field_name] == []:
                record[field_name] = None
        new_table.append(record)

    new_db_path = str(db_path)
    with open(new_db_path, "w") as f:
        json.dump(data, f, indent=4)

def find_records_that_lack_all_fields(db_dirname: str, db_filename: str):
    db_path = project_paths.get_data_path(db_dirname) / db_filename
    with open(db_path, "r") as f:
        data = json.load(f)

    all_fields = set()
    for record in data:
        for key in record.keys():
            all_fields.add(key)

    new_table = []
    for record in data:
        for field in all_fields:
            if field not in record:
                print(f"Record {record['title']} missing field: {field}")
                record[field] = None
        new_table.append(record)

    new_db_path = str(db_path).replace(".json", "_filled.json")
    with open(new_db_path, "w") as f:
        json.dump(new_table, f, indent=4)

def convert_avg_rating_to_float():
    with open(
        project_paths.get_data_path(USERS_DB_DIR_NAME) / USERS_DB_FILE_NAME, "r"
    ) as f:
        data = json.load(f)

    for record in data:
        if "averageRating" in record:
            record["averageRating"] = float(record["averageRating"])

    with open(
        project_paths.get_data_path(USERS_DB_DIR_NAME) / USERS_DB_FILE_NAME, "w"
    ) as f:
        json.dump(data, f, indent=4)

def replace_model_names_with_ids(db_dirname: str, db_filename: str):
    db_path = project_paths.get_data_path(db_dirname) / db_filename
    with open(db_path, "r") as f:
        model_data = json.load(f)

    with open(
        project_paths.get_data_path(USERS_DB_DIR_NAME) / USERS_DB_FILE_NAME, "r"
    ) as f:
        user_data = json.load(f)

    new_json_data = []

    for record in user_data:
        if "ownModels" in record:
            temp = record["ownModels"][:]
            by_id = []

            for model in temp:
                found = False
                for model_record in model_data:
                    try:
                        if model == model_record["titleSystemName"]:
                            by_id.append(model_record["id"])
                            found = True
                            break
                    except KeyError:
                        for key in model_record.keys():
                            if "itl" in key.lower():
                                print(f"Candidate key: {key}")
                        raise KeyError(
                            f"Model record doesn't have a titleSystemName key: {model_record}"
                        )

                if not found:
                    print(f"Model not found: {model}")
                    return

            record["ownModels"] = by_id
        
        new_json_data.append(record)

    with open(
        project_paths.get_data_path(USERS_DB_DIR_NAME) / USERS_DB_FILE_NAME, "w"
    ) as f:
        json.dump(new_json_data, f, indent=4)


def add_id_col(db_dirname: str, db_filename: str, hash_ids: bool = False):
    db_path = project_paths.get_data_path(db_dirname) / db_filename
    with open(db_path, "r") as f:
        data = json.load(f)

    if any([key.lower() == "id" for key in data[0]]):
        print("ID column already exists in the file")
        return

    id_index = 1
    for record in data:
        if hash_ids:
            primary_key_bytes = record["title"].encode("utf-8")
            hash_object = hashlib.md5(primary_key_bytes)
            hash_hex = hash_object.hexdigest()
            record["id"] = hash_hex
        else:
            record["id"] = id_index
            id_index += 1

    new_db_path = str(db_path).replace(".json", "_id.json")
    with open(new_db_path, "w") as f:
        json.dump(data, f, indent=4)

    json_table_to_create_table_sql_cmd(data)


def destructure_jsonb_field(
    db_dirname: str,
    db_filename: str,
    field_name: str,
    primary_key: str,
    create_id_col: bool = True,
    hash_ids: bool = False,
):
    db_path = project_paths.get_data_path(db_dirname) / db_filename
    with open(db_path, "r") as f:
        data = json.load(f)

    new_table = []
    existing_primary_keys = []

    for record in data:
        if field_name in record:
            for sub_record in record[field_name]:
                new_record = sub_record.copy()
                if new_record[primary_key] not in existing_primary_keys:
                    new_table.append(new_record)
                    existing_primary_keys.append(new_record[primary_key])

    # Generate IDs
    id_index = 1
    if create_id_col:
        for record in new_table:
            if hash_ids:
                primary_key_bytes = record[primary_key].encode("utf-8")
                hash_object = hashlib.md5(primary_key_bytes)
                hash_hex = hash_object.hexdigest()
                record["id"] = hash_hex
            else:
                record["id"] = id_index
                id_index += 1

    # Save json file
    new_db_path = str(db_path).replace(".json", f"_{field_name}.json")
    with open(new_db_path, "w") as f:
        json.dump(new_table, f, indent=4)

    json_table_to_create_table_sql_cmd(new_table)

    # Replace record in original json file to just have the ids
    for record in data:
        if field_name in record:
            if create_id_col:
                record[field_name] = [
                    field_json_value["id"] for field_json_value in new_table
                ]
            else:
                record[field_name] = [
                    field_json_value[primary_key] for field_json_value in new_table
                ]

    with open(db_path, "w") as f:
        json.dump(data, f, indent=4)


def json_table_to_create_table_sql_cmd(data):
    all_fields = {}
    float_fields = {}
    conflict_fields = set()

    for record in data:
        for key in record.keys():
            if isinstance(record[key], dict):
                dataType = "JSONB"
            elif isinstance(record[key], list):
                list_types = set([type(x) for x in record[key]])
                if len(list_types) == 1:
                    type_name = list_types.pop()
                    if type_name == dict:
                        dataType = "JSONB"
                    elif type_name == str:
                        dataType = "TEXT[]"
                    elif type_name == int:
                        dataType = "INTEGER[]"
                    elif type_name == float:
                        dataType = "NUMERIC[]"
                    elif type_name == bool:
                        dataType = "BOOLEAN[]"
                    else:
                        dataType = "JSONB"
                else:
                    dataType = "JSONB"
            elif isinstance(record[key], str):
                if len(record[key]) > 255:
                    dataType = "TEXT"
                else:
                    dataType = "VARCHAR(255)"
            elif isinstance(record[key], int):
                if record[key] > 2147483647:
                    dataType = "BIGINT"
                else:
                    dataType = "INTEGER"
            elif isinstance(record[key], float):
                str_ver = str(record[key])
                decimal_places = len(str_ver.split(".")[1])
                pre_count = len(str_ver.split(".")[0])
                if key not in float_fields:
                    float_fields[key] = [(pre_count, decimal_places)]
                else:
                    float_fields[key].append((pre_count, decimal_places))
            elif isinstance(record[key], bool):
                dataType = "BOOLEAN"
            else:
                dataType = "TEXT"

            if key in all_fields:
                if all_fields[key] != dataType:
                    resolved = False
                    if all_fields[key] == "VARCHAR(255)" and dataType == "TEXT":
                        all_fields[key] = "TEXT"
                        resolved = True
                    if all_fields[key] == "TEXT" and dataType == "VARCHAR(255)":
                        all_fields[key] = "TEXT"
                        resolved = True
                    if all_fields[key] == "INTEGER" and dataType == "BIGINT":
                        all_fields[key] = "BIGINT"
                        resolved = True
                    if all_fields[key] == "BIGINT" and dataType == "INTEGER":
                        all_fields[key] = "BIGINT"
                        resolved = True
                    if all_fields[key] == "NUMERIC" and dataType == "INTEGER":
                        all_fields[key] = "NUMERIC"
                        resolved = True
                    if all_fields[key] == "INTEGER" and dataType == "NUMERIC":
                        all_fields[key] = "NUMERIC"
                        resolved = True

                    if not resolved:
                        conflict_fields.add(
                            f"[{key}] Could not resolve field type mismatch\nExisting dataType: {all_fields[key]}\nSaw new dataType: {dataType} from the value {record[key]}\n"
                        )

            else:
                all_fields[key] = dataType

    for key in float_fields.keys():
        max_pre_decimal = max([x[0] for x in float_fields[key]])
        min_pre_decimal = min([x[0] for x in float_fields[key]])
        pre_decimal_diff = max_pre_decimal - min_pre_decimal

        max_post_decimal = max([x[1] for x in float_fields[key]])
        min_post_decimal = min([x[1] for x in float_fields[key]])
        post_decimal_diff = max_post_decimal - min_post_decimal

        if (
            max_pre_decimal > 4
            or max_post_decimal > 4
            or pre_decimal_diff > 0
            or post_decimal_diff > 0
        ):
            all_fields[key] = "NUMERIC"
        else:
            all_fields[key] = f"NUMERIC({max_pre_decimal}, {max_post_decimal})"

    sql_str = "CREATE TABLE users ( "
    for key, dataType in all_fields.items():
        sql_str += f"{key} {dataType}, "
    sql_str = sql_str[:-2] + " );"

    print("\n\nSQL string by line:")
    for key, dataType in all_fields.items():
        print(f"{key} {dataType}, ")

    print(f"\n\nOne-liner sql string: {sql_str}")

    if conflict_fields:
        print("\n\nConflicting fields:")
        for field in conflict_fields:
            print(field)
            parsed_field_name = field.split("[")[1].split("]")[0]
            print("\nExample Field Values in data:")
            example_count = 0
            for record in data:
                if example_count > 11:
                    break
                print(record[parsed_field_name])
                example_count += 1
