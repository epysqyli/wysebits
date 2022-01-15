import slugify from "slugify";

// miscellaneous functions needed throughout the repo

const shortenText = (sourceText, lowerBound) => {
  if (sourceText.split(" ").length > lowerBound) {
    return sourceText.split(" ").slice(0, lowerBound).join(" ") + " ...";
  } else {
    return sourceText;
  }
};

const capitalize = (str) => {
  return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
};

const slug = (title, id) =>
  slugify(`${title}-${id}`, { lower: true, strict: true });

const isEntryValid = (content) => {
  if (content.trim().length > 50 && content.trim().length < 2250)
    return true;
  return false;
};

export { isEntryValid, shortenText, slug, capitalize };
