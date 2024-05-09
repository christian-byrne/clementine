function sortRecordsByKey(data, key, order = "asc") {
  if (key == false) { 
    return data;
  }
  let returnRecords = [];
  if (data == null || data.length === 0) {
    console.error("Data is empty or not in the correct format");
    returnRecords = [...data];
  } else if (key === "random") {
    returnRecords = data.sort(() => Math.random() - 0.5);
  } else {
    returnRecords = data.sort((a, b) => {
      if (order !== "asc") {
        return a[key] < b[key] ? -1 : 1;
      }
      return a[key] > b[key] ? -1 : 1;
    });
  }
  return [...returnRecords];
}

export default sortRecordsByKey;
