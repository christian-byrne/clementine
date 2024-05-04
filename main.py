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
from service_classes.updaters.updaters_utils import UpdatersUtils
from service_classes.updaters.items_update import add_new_items

if __name__ == "__main__":
    # styles_table = UpdatersUtils.get_styles_table()
    # clothing_itmes = set()
    # for style in styles_table:
    #     clothing_itmes.update(style["Tops"])

    # print(clothing_itmes)
    add_new_items(dry_run=True)
