from service_classes.updaters.stylists_update import (
    add_new_stylists,
    populate_empty_stylists_fields,
)
from service_classes.updaters.photos_update import (
    populate_empty_photo_fields,
    add_new_photos,
)
from service_classes.updaters.styles_update import (
    populate_style_photos,
    del_removed_images_from_photos_fields,
    add_new_images_to_photos_fields,
)


if __name__ == "__main__":
    del_removed_images_from_photos_fields(dry_run=False)
    add_new_images_to_photos_fields(dry_run=False)
