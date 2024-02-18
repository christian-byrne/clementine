export function camelCaseToTitle(camelCaseString) {
  let ret = "";
  for (let i = 0; i < camelCaseString.length; i++) {
    if (camelCaseString[i] === camelCaseString[i].toUpperCase()) {
      ret += " " + camelCaseString[i];
    } else {
      ret += camelCaseString[i];
    }
  }
  // Capitalize the first letter
  return ret[0].toUpperCase() + ret.slice(1);
}
