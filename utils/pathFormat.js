function pathFormat(path, href = false) {
  // If first character is not a forward slash, add it
  // if (path.charAt(0) !== "/") {
  //   path = "/" + path;
  // }
  // For next.js, remove the leading slash if the first character is a forward slash
  // if (path.charAt(0) === "/") {
  //   path = path.slice(1);
  // }
  // If there is a route, add a forward slash
  if (href) {
    path = "/" + path;
    // let basePath = process.env.NEXT_PUBLIC_BASE_PATH;
    let basePath = "/clementine";
    // If there is a base path and the path does not already start with the base path, add it
    if (
      (basePath && path.indexOf(basePath) === -1) || // handle situations where the word clementine is in the path but not at the beginning
      (basePath &&
        path.includes("/clementine") &&
        path.indexOf("/clementine") !== 0)
    ) {
      path = basePath + path;
    }
  }
  return path;
}

export default pathFormat;
