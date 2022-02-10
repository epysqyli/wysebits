import axios from "axios";

const updateFeed = async (user, feedType, page) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.id}/${feedType}?page=${page}`,
    withCredentials: true,
  });
};

const getGuestFeed = async (page) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/tile_entries/guest_feed?page=${page}`,
  });
};

const getUserFeed = async (user, context, page) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/user_feed?page=${page}`,
    headers: { cookie: context.req.headers.cookie },
  });
};

const getFavCategoriesFeed = async (user, context, page) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/categories_feed?page=${page}`,
    headers: { cookie: context.req.headers.cookie },
  });
};

const getFollowingFeed = async (user, context, page) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/following_feed?page=${page}`,
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
