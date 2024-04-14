import path from "path";
import fs from "fs/promises"; // Use promises-based fs module

export default async function handler(req, res) {
  try {
    const { folderName, exclude } = req.query;

    const imageDirectory = path.join(
      process.cwd(),
      "public",
      "pictures",
      "models",
      folderName
    );

    const imageFiles = await fs.readdir(imageDirectory);

    const filteredImageFiles = imageFiles.filter((file) => {
      return (
        (file.endsWith(".png") ||
          file.endsWith(".jpg") ||
          file.endsWith(".jpeg") ||
          file.endsWith(".webp")) &&
        !file.includes(exclude)
      );
    });

    filteredImageFiles.sort((a, b) => {
      const pattern = /(\d+)/; // Regular expression to match numeric substrings

      const numPart = (str) => {
        const match = str.match(pattern);
        return match ? parseInt(match[0], 10) : NaN; // Parse the numeric part as an integer
      };

      const numA = numPart(a);
      const numB = numPart(b);

      if (!isNaN(numA) && !isNaN(numB)) {
        // If both filenames have numeric suffixes, compare them numerically
        if (numA < numB) return -1;
        if (numA > numB) return 1;
        return 0;
      }

      // If one or both filenames lack numeric suffixes, fall back to lexicographical comparison
      return a.localeCompare(b);
    });

    const gridIndex = filteredImageFiles.findIndex((file) =>
      file.includes("grid")
    );
    if (gridIndex !== -1) {
      const gridFile = filteredImageFiles.splice(gridIndex, 1);
      filteredImageFiles.unshift(gridFile[0]);
    }

    const imagePaths = filteredImageFiles.map((file) =>
      path.join("/pictures", "models", folderName, file)
    );

    res.status(200).json({ imageFiles: imagePaths });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
