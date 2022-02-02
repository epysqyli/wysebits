// methods used to perform actios related to username/password/email updates

const isMatching = (first, second) => {
  if (first !== "" && first === second) return true;

  return false;
};

export { isMatching };
