function sortRecordsByKey(data, key) {
  if (key === "random") {
    return data.sort(() => Math.random() - 0.5);
  }
  return data.sort((a, b) => b[key] - a[key]);
}

export default sortRecordsByKey;
