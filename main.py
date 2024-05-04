from service_classes.updaters.stylists_update import (
    add_new_stylists,
    populate_empty_stylists_fields,
)
from service_classes.updaters.photos_update import (
    populate_empty_photo_fields,
    add_new_photos,
)
from service_classes.updaters.field_value_generators import FieldGenerator
from pathlib import Path

if __name__ == "__main__":
    # add_new_stylists()
    # add_new_photos()
    # populate_empty_photo_fields()
    # populate_empty_stylists_fields()

    rg = FieldGenerator(
        max_resolution=512
    )
    # print(rg.description())
    test_pic_path = "/home/c_byrne/school/courses/game310/final-project/wardrobe/public/pictures/models/you-look-lonely,-i-can-fix-that"
    test_pic_path = Path(test_pic_path)

    x = rg.stylist_tags(
        test_pic_path,
        max_pictures=2,
    )

    print(x)

