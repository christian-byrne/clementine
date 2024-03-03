import pathFormat from "./pathFormat";

function getGridPath(title) {
  let titleFormatted = title.toLowerCase().replace(/\s/g, "-");
  // need to handle hyphens next to other characters like (, ), etc.,
  let path = pathFormat(`pictures/models/${titleFormatted}/${titleFormatted}-grid-2x2.png`);
  return path;
}

export default getGridPath;
