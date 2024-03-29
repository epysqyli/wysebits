import axios from "axios";

const getCategories = async () => {
  return await axios.get(`${process.env.BASE_URL}/categories`);
};

const getCategoryBooks = async (slug, pageNum = 1) => {
  return await axios.get(`${process.env.BASE_URL}/categories/${slug}?page=${pageNum}`);
};

const getBook = async (id) => {
  return await axios.get(`${process.env.BASE_URL}/books/${id}`);
};

const getUser = async (username) => {
  return await axios.get(`${process.env.BASE_URL}/users/${username}`);
};

const getLoggedUser = async (context) => {
  return await axios({
    method: "get",
    url: `${process.env.BASE_URL}/logged_in`,
    headers: { cookie: context.req.headers.cookie }
  });
};

const getBookTile = async (user, tileId) => {
  return await axios({
    method: "get",
    url: `${process.env.BASE_URL}/users/${user.data.user.id}/book_tiles/${tileId}`
  });
};

const getBookTiles = async (user, pageNum) => {
  return await axios({
    method: "get",
    url: `${process.env.BASE_URL}/users/${user.data.user.id}/book_tiles?page=${pageNum}`
  });
};

const getWipTiles = async (user, context, pageNum) => {
  return await axios({
    method: "get",
    url: `${process.env.BASE_URL}/users/${user.data.user.id}/book_tiles/temporary?page=${pageNum}`,
    headers: { cookie: context.req.headers.cookie }
  });
};

const getBookEntries = async (id, pageNum) => {
  return axios(`${process.env.BASE_URL}/books/${id}/tile_entries?page=${pageNum}`);
};

const getUserEntries = async (user, pageNum) => {
  return await axios.get(`${process.env.BASE_URL}/users/${user.data.user.id}/tile_entries?page=${pageNum}`);
};

const getUserCommentedEntries = async (user, pageNum = 1) => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/users/${user.data.user.id}/tile_entries/commented_entries?page=${pageNum}`
  });
};

const getFavBooks = async (user, context, pageNum = 1) => {
  return await axios({
    method: "get",
    url: `${process.env.BASE_URL}/users/${user.data.user.id}/fav_books?page=${pageNum}`,
    headers: { cookie: context.req.headers.cookie }
  });
};

const getAllFavBooks = async (user, context) => {
  return await axios({
    method: "get",
    url: `${process.env.BASE_URL}/users/${user.data.user.id}/fav_books/nonpaginated`,
    headers: { cookie: context.req.headers.cookie }
  });
};

const getFavEntries = async (user, context, pageNum = 1) => {
  return await axios({
    method: "get",
    url: `${process.env.BASE_URL}/users/${user.data.user.id}/fav_tile_entries?page=${pageNum}`,
    headers: { cookie: context.req.headers.cookie }
  });
};

const getAllFavEntries = async (user, context) => {
  return await axios({
    method: "get",
    url: `${process.env.BASE_URL}/users/${user.data.user.id}/fav_tile_entries/nonpaginated`,
    headers: { cookie: context.req.headers.cookie }
  });
};

const getFollowers = async (user, context, pageNum) => {
  return await axios({
    method: "get",
    url: `${process.env.BASE_URL}/users/${user.data.user.id}/followers?page=${pageNum}`,
    headers: { cookie: context.req.headers.cookie }
  });
};

const getAllFollowers = async (user, context) => {
  return await axios({
    method: "get",
    url: `${process.env.BASE_URL}/users/${user.data.user.id}/followers/nonpaginated`,
    headers: { cookie: context.req.headers.cookie }
  });
};

const getFollowing = async (user, context, pageNum) => {
  return await axios({
    method: "get",
    url: `${process.env.BASE_URL}/users/${user.data.user.id}/following?page=${pageNum}`,
    headers: { cookie: context.req.headers.cookie }
  });
};

const getAllFollowing = async (user, context) => {
  return await axios({
    method: "get",
    url: `${process.env.BASE_URL}/users/${user.data.user.id}/following/nonpaginated`,
    headers: { cookie: context.req.headers.cookie }
  });
};

const getUpvotedEntries = async (user, context) => {
  return axios({
    method: "get",
    url: `${process.env.BASE_URL}/users/${user.data.user.id}/upvoted_entries`,
    headers: { cookie: context.req.headers.cookie }
  });
};

const getDownvotedEntries = async (user, context) => {
  return await axios({
    method: "get",
    url: `${process.env.BASE_URL}/users/${user.data.user.id}/downvoted_entries`,
    headers: { cookie: context.req.headers.cookie }
  });
};

const isBookTileAvailable = async (user, context) => {
  return await axios({
    method: "get",
    url: `${process.env.BASE_URL}/users/${user.data.user.id}/books/${context.params.id}/book_tiles/available`,
    headers: { cookie: context.req.headers.cookie }
  });
};

const getFavCategories = async (user, context) => {
  return await axios({
    method: "get",
    url: `${process.env.BASE_URL}/users/${user.data.user.id}/fav_categories`,
    headers: { cookie: context.req.headers.cookie }
  });
};

const getCategoryRecommendations = async (bookId) => {
  return await axios.get(`${process.env.BASE_URL}/books/${bookId}/recommendations`);
};

const getAuthor = async (authorId, page) => {
  return await axios({
    method: "get",
    url: `${process.env.BASE_URL}/authors/${authorId}?page=${page}`
  });
};

const getUserStats = async (userId) => {
  return await axios({
    method: "get",
    url: `${process.env.BASE_URL}/users/${userId}/stats`
  });
};

const getWeeklyTrend = async () => {
  return await axios({
    method: "get",
    url: `${process.env.BASE_URL}/weekly_trend`
  });
};

export {
  getLoggedUser,
  getUser,
  getBookTile,
  getBookTiles,
  getCategories,
  getCategoryBooks,
  getBook,
  isBookTileAvailable,
  getWipTiles,
  getBookEntries,
  getUserEntries,
  getUserCommentedEntries,
  getFavBooks,
  getAllFavBooks,
  getFollowing,
  getFollowers,
  getAllFollowing,
  getAllFollowers,
  getFavEntries,
  getAllFavEntries,
  getUpvotedEntries,
  getDownvotedEntries,
  getFavCategories,
  getCategoryRecommendations,
  getAuthor,
  getUserStats,
  getWeeklyTrend
};
