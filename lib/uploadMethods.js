const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

const isAvatarValid = (arrayBuffer) => {
  const maxSize = 3000000;
  if (allowedTypes.includes(arrayBuffer.type) && arrayBuffer.size < maxSize)
    return true;

  return false;
};

const isCoverValid = (arrayBuffer) => {
  const maxSize = 5000000;
  if (allowedTypes.includes(arrayBuffer.type) && arrayBuffer.size < maxSize)
    return true;

  return false;
};

export { isAvatarValid, isCoverValid };
