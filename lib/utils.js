// miscellaneous functions needed throughout the repo

const shortenText = (sourceText) => {
  if (sourceText.split(" ").length > 20) {
    return sourceText.split(" ").slice(0, 20).join(" ") + " ...";
  } else {
    return sourceText;
  }
};

export { shortenText };
