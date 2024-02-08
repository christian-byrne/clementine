const USING_GITHUB_PAGES = true;

function pathPrefix(path) {
  return USING_GITHUB_PAGES
    ? process.env.PUBLIC_URL + "/#" + path
    : process.env.PUBLIC_URL + path;
}

export { USING_GITHUB_PAGES, pathPrefix };
