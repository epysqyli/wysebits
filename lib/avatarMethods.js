import axios from "axios";

const getAvatar = async (userId) => {
  return await axios({
    method: "GET",
    url: `http://localhost:3001/api/users/${userId}/avatar`,
  });
};

const createAvatar = async (userId, data) => {
  return await axios({
    method: "POST",
    url: `http://localhost:3001/api/users/${userId}/avatar`,
    data: data,
    withCredentials: true,
  });
};

const deleteAvatar = async (userId) => {
  return await axios({
    method: "DELETE",
    url: `http://localhost:3001/api/users/${userId}/avatar`,
    withCredentials: true,
  });
};

export { getAvatar, createAvatar, deleteAvatar };
