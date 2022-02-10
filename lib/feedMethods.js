import axios from "axios";

const updateFeed = async (user, feedType, page) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.id}/feed/${feedType}?page=${page}`,
    withCredentials: true,
  });
};

const getGuestFeed = async (page) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/feed/guest_feed?page=${page}`,
  });
};

const getUserFeed = async (user, context, page) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/feed/user_feed?page=${page}`,
    headers: { cookie: context.req.headers.cookie },
  });
};

const getFavCategoriesFeed = async (user, context, page) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/feed/categories_feed?page=${page}`,
    headers: { cookie: context.req.headers.cookie },
  });
};

const getFollowingFeed = async (user, context, page) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/feed/following_feed?page=${page}`,
    headers: { cookie: context.req.headers.cookie },
  });
};

export {
  updateFeed,
  getGuestFeed,
  getUserFeed,
  getFavCategoriesFeed,
  getFollowingFeed,
};
