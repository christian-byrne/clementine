import path from "path";
import modelDirContents from "@/data/fs-contents/models.json";

export default function getStylistImagePaths(folderName, exclude) {
  const folderContents = modelDirContents;
  let imageFiles = folderContents[folderName];

  if (!imageFiles) {
    return [];
  }

  imageFiles.sort((a, b) => {
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

  // Remove images that include exclude phrase
  if (exclude) {
    const excludePattern = new RegExp(exclude);
    imageFiles = imageFiles.filter((file) => !excludePattern.test(file));
  }

  const gridIndex = imageFiles.findIndex((file) => file.includes("grid"));
  if (gridIndex !== -1) {
    const gridFile = imageFiles.splice(gridIndex, 1);
    imageFiles.unshift(gridFile[0]);
  }

  const imagePaths = imageFiles.map((file) =>
    path.join("/pictures", "models", folderName, file)
  );

  return imagePaths;
}
