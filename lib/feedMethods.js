import axios from "axios";

const updateUserFeed = async (user, page) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.id}/user_feed?page=${page}`,
    withCredentials: true,
  });
};

const updateFavCategoriesFeed = async (user, page) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.id}/categories_feed?page=${page}`,
    withCredentials: true,
  });
};

const updateFollowingFeed = async (user, page) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.id}/following_feed?page=${page}`,
    withCredentials: true,
  });
};

export { updateUserFeed, updateFavCategoriesFeed, updateFollowingFeed };
