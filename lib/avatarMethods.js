import axios from "axios";

const getAvatar = async (userId) => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/users/${userId}/avatar`,
  });
};

const createAvatar = async (userId, data) => {
  return await axios({
    method: "POST",
    url: `${process.env.BASE_URL}/users/${userId}/avatar`,
    data: data,
    withCredentials: true,
  });
};

const deleteAvatar = async (userId) => {
  return await axios({
    method: "DELETE",
    url: `${process.env.BASE_URL}/users/${userId}/avatar`,
    withCredentials: true,
  });
};

export { getAvatar, createAvatar, deleteAvatar };
