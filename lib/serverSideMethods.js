import axios from "axios";

const getLoggedUser = async (context) => {
  return await axios({
    method: "get",
    url: "http://localhost:3001/api/logged_in",
    headers: { cookie: context.req.headers.cookie },
  });
};

const getFavBooks = async (user, context, pageNum) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/fav_books?page=${pageNum}`,
    headers: { cookie: context.req.headers.cookie },
  });
};

const getAllFollowing = async (user, context) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/unpaged_following`,
    headers: { cookie: context.req.headers.cookie },
  });
};

const getFavEntries = async (user, context, pageNum) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/fav_tile_entries?page=${pageNum}`,
    headers: { cookie: context.req.headers.cookie },
  });
};

const getUpvotedEntries = async (user, context) => {
  return axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/upvoted_entries`,
    headers: { cookie: context.req.headers.cookie },
  });
};

const getDownvotedEntries = async (user, context) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/downvoted_entries`,
    headers: { cookie: context.req.headers.cookie },
  });
};

export {
  getLoggedUser,
  getFavBooks,
  getAllFollowing,
  getFavEntries,
  getUpvotedEntries,
  getDownvotedEntries,
};
