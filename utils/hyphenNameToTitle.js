export function hyphenToCamelCase(hyphenString) {
  return hyphenString.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}
export function hyphenToTitle(hyphenString) {
  return hyphenString.replace(/-/g, " ").replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
