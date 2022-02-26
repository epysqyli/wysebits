// methods used to perform actions related to username/password/email updates

import axios from "axios";

const isMatching = (first, second) => {
  if (first !== "" && first === second) return true;

  return false;
};

const isEmailAvailable = async (email_address) => {
  return await axios({
    method: "post",
    url: `${process.env.BASE_URL}/users/email_address_available`,
    data: { user: { email_address: email_address } },
  });
};

const isUsernameAvailable = async (username) => {
  return await axios({
    method: "post",
    url: `${process.env.BASE_URL}/users/username_available`,
    data: { user: { username: username } },
  });
};

export { isEmailAvailable, isMatching, isUsernameAvailable };
