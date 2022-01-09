import axios from "axios";

const updateCustomFeed = async (user, page) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.id}/custom_feed?page=${page}`,
    withCredentials: true,
  });
};

export { updateCustomFeed };
