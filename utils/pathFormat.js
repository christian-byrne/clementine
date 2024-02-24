function pathFormat(path) {
  // If first character is not a forward slash, add it
  // if (path.charAt(0) !== "/") {
  //   path = "/" + path;
  // }
  // For next.js, remove the leading slash if the first character is a forward slash
  if (path.charAt(0) === "/") {
    path = path.slice(1);
  }
  // let basePath = process.env.NEXT_PUBLIC_BASE_PATH;
  // let basePath = "/clementine";
  let basePath = ""
  // If there is a base path and the path does not already start with the base path, add it
  if (basePath && path.indexOf(basePath) === -1) {
    path = basePath + path;
  }  
  return path;
}

export default pathFormat;