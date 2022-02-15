// methods used to perform actions related to username/password/email updates

const isMatching = (first, second) => {
  if (first !== "" && first === second) return true;

  return false;
};

const isEmailAvailable = async (email_address) => {
  return await axios({
    method: "post",
    url: "http://localhost:3001/api/users/email_address_available",
    data: { user: { email_address: email_address } },
  });
};

const isUsernameAvailable = async (username) => {
  return await axios({
    method: "post",
    url: "http://localhost:3001/api/users/username_available",
    data: { user: { username: username } },
  });
};

export { isEmailAvailable, isMatching, isUsernameAvailable };
