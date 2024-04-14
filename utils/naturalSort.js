// Custom sorting function to handle filenames like 'photo-1', 'photo-2', ..., 'photo-10'
function naturalSort(a, b) {
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
}

export default naturalSort;