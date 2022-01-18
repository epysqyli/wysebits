import axios from "axios";

const updateFeed = async (user, feedType, page) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.id}/${feedType}?page=${page}`,
    withCredentials: true,
  });
};

export { updateFeed };
