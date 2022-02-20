const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

const isAvatarValid = (arrayBuffer) => {
  const maxSize = 3000000;
  if (allowedTypes.includes(arrayBuffer.type) && arrayBuffer.size < maxSize)
    return true;

  return false;
};

const isCoverValid = () => {};

export { isAvatarValid, isCoverValid };
