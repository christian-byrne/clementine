from service_classes.updaters.stylists_update import (
    add_new_stylists,
    populate_empty_stylists_fields,
)
from service_classes.updaters.photos_update import (
    populate_empty_photo_fields,
    add_new_photos,
)
from service_classes.updaters.updaters_utils import UpdatersUtils
from service_classes.updaters.field_value_generators import FieldGenerator
from pathlib import Path

if __name__ == "__main__":
    # add_new_stylists()
    # add_new_photos()
    # populate_empty_photo_fields()
    populate_empty_stylists_fields(dry_run=False)



