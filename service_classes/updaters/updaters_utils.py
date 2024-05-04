from service_classes.paths import ProjectPaths
from service_classes.constants import (
    STYLISTS_DB_DIR_NAME,
    STYLISTS_DB_PK,
    STYLISTS_DB_FILE_NAME,
    PHOTOS_DB_DIR_NAME,
    PHOTOS_DB_FILE_NAME,
    PHOTOS_DB_PK,
    USERS_DB_DIR_NAME,
    USERS_DB_FILE_NAME,
    USERS_DB_PK,
    STYLES_DB_DIR_NAME,
    STYLES_DB_FILE_NAME,
    STYLES_DB_PK,
)
from service_classes.table import DatabaseTable


class UpdatersUtils:
    @staticmethod
    def get_stylists_table() -> DatabaseTable:
        """
        Get the Stylists Table.

        Returns:
            DatabaseTable: The Stylists Table.
        """
        return DatabaseTable(
            ProjectPaths()().get_data_path(STYLISTS_DB_DIR_NAME) / STYLISTS_DB_FILE_NAME,
            STYLISTS_DB_PK)
    
    @staticmethod
    def get_photos_table() -> DatabaseTable:
        """
        Get the Photos Table.

        Returns:
            DatabaseTable: The Photos Table.
        """
        return DatabaseTable(
            ProjectPaths()().get_data_path(PHOTOS_DB_DIR_NAME) / PHOTOS_DB_FILE_NAME,
            PHOTOS_DB_PK)
    
    @staticmethod
    def get_users_table() -> DatabaseTable:
        """
        Get the Users Table.

        Returns:
            DatabaseTable: The Users Table.
        """
        return DatabaseTable(
            ProjectPaths()().get_data_path(USERS_DB_DIR_NAME) / USERS_DB_FILE_NAME,
            USERS_DB_PK)

    @staticmethod
    def get_styles_table() -> DatabaseTable:
        """
        Get the Styles Table.

        Returns:
            DatabaseTable: The Styles Table.
        """
        return DatabaseTable(
            ProjectPaths()().get_data_path(STYLES_DB_DIR_NAME) / STYLES_DB_FILE_NAME,
            STYLES_DB_PK)