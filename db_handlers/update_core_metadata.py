from pathlib import Path
import os
import time
from typing import List, Tuple
from db_handlers.call_wrapper import CallAttempt


def get_updated_metadata(file_fullpath: Path) -> Tuple[dict, bool, List[str]]:
    all_errors = []
    size = get_size(file_fullpath, all_errors)
    new_metadata = {
        "size": size,
        "humanReadableSize": get_human_readable_size(size, all_errors),
        **get_path_metadata(file_fullpath, all_errors),
        **get_time_metadata(file_fullpath, all_errors),
    }

    return new_metadata, len(all_errors) == 0, all_errors


def catches_updated_copy(updates: dict = {}):
    generic_catches = {
        TypeError: "TypeError: The file_fullpath arg is not a pathlib.Path object",
        PermissionError: "PermissionError: Permission denied when trying to access file metadata",
        FileNotFoundError: "FileNotFoundError: The file whose metadata you are trying to update was not found",
    }
    new_catches = generic_catches.copy()
    new_catches.update(updates)
    return new_catches


def get_human_readable_size(size_in_bytes: int, all_errors: list) -> str:
    def access_human_readable_size(size) -> str:
        for unit in ["B", "KB", "MB", "GB", "TB"]:
            if size < 1024.0:
                return f"{size:.2f} {unit}"
            size /= 1024.0

    human_readable_size, success, error = (
        CallAttempt(
            access_human_readable_size,
            catches_updated_copy(
                {
                    NameError: "NameError: The size variable is not defined",
                    TypeError: "TypeError: The size variable is not an integer",
                }
            ),
        )(size_in_bytes)
        | "0 B"
    )
    if not success:
        all_errors.append(error)

    return human_readable_size


def get_size(file_fullpath: Path, all_errors: list) -> int:
    def access_filesize() -> int:
        return os.path.getsize(file_fullpath.resolve())

    size, success, error = (
        CallAttempt(
            access_filesize,
            catches_updated_copy(
                {
                    OSError: "OSError when trying to access filesize",
                }
            ),
        )(file_fullpath)
        | 0
    )

    if not success:
        all_errors.append(error)

    return size


def get_path_metadata(fullpath: Path, all_errors: list) -> dict:
    def access_path_metadata(file_fullpath: Path) -> dict:
        return {
            "fullPath": file_fullpath,
            "extension": file_fullpath.suffix,
            "filename": file_fullpath.name,
            "parent_dirname": file_fullpath.parent.name,
            "parent_dirpath": file_fullpath.parent,
        }

    path_metadata, success, errors = CallAttempt(
        access_path_metadata, catches_updated_copy()
    )(fullpath) | {"fullPath": fullpath, "filename": str(fullpath).split("/")[-1]}
    if not success:
        all_errors.extend(errors)

    return path_metadata


def get_time_metadata(fullpath: Path, all_errors: list) -> dict:
    def access_time_metadata(file_fullpath: Path) -> dict:
        return {
            "lastModified": os.path.getmtime(file_fullpath),
            "lastAccessed": os.path.getatime(file_fullpath),
            "lastUpdated": int(time.time()),
        }

    time_metadata, success, errors = CallAttempt(
        access_time_metadata,
        catches_updated_copy(
            {
                OverflowError: "OverflowError: The file's mtime or atime metadata is too large",
                OSError: "OSError: Could not access file's mtime or atime metadata - System call failed",
                ValueError: "ValueError: The file's mtime or atime metadata could not be converted to an integer",
            }
        ),
    )(fullpath) | {"lastModified": 0, "lastAccessed": 0, "lastUpdated": 1714788524}
    if not success:
        all_errors.extend(errors)

    return time_metadata
