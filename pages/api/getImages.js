import path from "path";
import fs from "fs";
import naturalSort from "@/utils/naturalSort";

export default function handler(req, res) {
  const folderName = req.query.folderName; // Get folder name from query
  const exclude = req.query.exclude; // Get exclude from query
  const imageDirectory = path.join(
    process.cwd(),
    "public",
    "pictures",
    "models",
    folderName
  ); // Path to your images directory
  const imageFiles = fs.readdirSync(imageDirectory); // Read directory synchronously

  const filteredImageFiles = imageFiles.filter((file) => {
    return (
      (file.endsWith(".png") ||
        file.endsWith(".jpg") ||
        file.endsWith(".jpeg") ||
        file.endsWith(".webp")) &&
      !file.includes(exclude)
    ); // Filter for image files
  });

  // Prepand path relative to the public directory to each image file
  filteredImageFiles.forEach((file, index) => {
    filteredImageFiles[index] = path.join(
      "/pictures",
      "models",
      folderName,
      file
    );
  });

  // Sort images by filename
  filteredImageFiles.sort((a, b) => {
    return naturalSort(a, b);
  });

  // Put the photo that has "grid" in the filename at the front
    const gridIndex = filteredImageFiles.findIndex((file) => file.includes("grid"));
    if (gridIndex !== -1) {
      const gridFile = filteredImageFiles.splice(gridIndex, 1);
      filteredImageFiles.unshift(gridFile[0]);
    }


  res.status(200).json({ imageFiles: filteredImageFiles });
}
