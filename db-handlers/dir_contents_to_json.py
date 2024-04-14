import os
import json

def create_directory_json(directory_path, output_file):
    data = {}
    
    # Traverse the directory recursively
    for root, dirs, files in os.walk(directory_path):
        # Get the relative path of the current directory from the root directory
        relative_path = os.path.relpath(root, directory_path)
        
        # Use relative path as the key in the JSON data
        if relative_path == '.':
            key = os.path.basename(directory_path)
        else:
            key = os.path.basename(relative_path)
        
        # Get files in the current directory
        file_list = [f for f in files if not f.startswith('.')]  # Exclude hidden files
        
        # Add the file list to the JSON data
        data[key] = file_list
    
    # Write data to a JSON file
    with open(output_file, 'w') as json_file:
        json.dump(data, json_file, indent=4)

# Example usage:
directory_path = '/home/c_byrne/school/courses/game310/final-project/wardrobe/public/pictures/models'
output_file = 'models-folder_contents.json'
create_directory_json(directory_path, output_file)
