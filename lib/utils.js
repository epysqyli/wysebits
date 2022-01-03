// miscellaneous functions needed throughout the repo

const shortenText = (sourceText, lowerBound) => {
  if (sourceText.split(" ").length > lowerBound) {
    return sourceText.split(" ").slice(0, lowerBound).join(" ") + " ...";
  } else {
    return sourceText;
  }
};

export { shortenText };
