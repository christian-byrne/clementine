from enum import Enum

class UpdateOption(Enum):
    SUBFIELD_APPEND_OR_OVERWRITE = (
        "subfield_append_or_overwrite",
        "If the field exists in the existing record, append the new values to the existing values if it's a reference type (other than tuple); otherwise, overwrite the existing value with the new value",
    )
    SUBFIELD_APPEND_ONLY = (
        "subfield_append_only",
        "When a value has a subfield that already exists in the existing record, append the subfield value",
    )
    SUBFIELD_OVERWRITE = (
        "subfield_overwrite",
        "When a value has a subfield that already exists in the existing record, overwrite the subfield value",
    )
    SUBFIELD_SYMM_DIFF_OR_OVERWRITE = (
        "subfield_symm_diff_or_overwrite",
        "If a value has a subfield that already exists in the existing record: If it is a reference type, append the new subfield values to the existing subfield values and remove the existing subfield values that are in the new subfield values (symmetric difference). If it's a primitive type, overwrite the existing subfield value with the new subfield value",
    )
    SUBFIELD_INTERSECTION = (
        "subfield_intersection",
        "If a value has a subfield that already exists in the existing record, remove values which don't match the new record, leave the rest as is",
    )
    SUBFIELD_SYMM_DIFF_ONLY = (
        "subfield_symm_diff_only",
        "Symm diff, but ignore subfield values that are primitive types and are already in the existing subfield values",
    )
    EMPTY_SUBFIELDS_ONLY = (
        "empty_subfields_only",
        "If a value has a subfield that already exists in the existing record, only add values when the field doesn't exist in the existing record",
    )
    RECORD_OVERWRITE = (
        "record_overwrite",
        "If a record exists, simply overwrite it with the new record",
    )
    RECORD_APPEND_ONLY = (
        "record_append_only",
        "If a record with the same primary key exists, skip",
    )