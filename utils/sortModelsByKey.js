function sortModelsByKey(models, key) {
  return models.sort((a, b) => b[key] - a[key]);
}

export default sortModelsByKey;
