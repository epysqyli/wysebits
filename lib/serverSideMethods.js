import axios from "axios";

const getCategories = async () => {
  return await axios.get("http://localhost:3001/api/categories");
};

const getCategoryBooks = async (slug, pageNum) => {
  return await axios.get(
    `http://localhost:3001/api/categories/${slug}/books?page=${pageNum}`
  );
};

const getBook = async (id) => {
  return await axios.get(`http://localhost:3001/api/books/${id}`);
};

const getUser = async (username) => {
  return await axios.get(`http://localhost:3001/api/users/${username}`);
};

const getLoggedUser = async (context) => {
  return await axios({
    method: "get",
    url: "http://localhost:3001/api/logged_in",
    headers: { cookie: context.req.headers.cookie },
  });
};

const getBookTile = async (user, tileId) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/book_tiles/${tileId}`,
  });
};

const getBookTiles = async (user, pageNum) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/book_tiles?page=${pageNum}`,
  });
};

const getWipTiles = async (user, context, pageNum) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/temp_book_tiles?page=${pageNum}`,
    headers: { cookie: context.req.headers.cookie },
  });
};

const getBookEntries = async (id, pageNum) => {
  return axios(
    `http://localhost:3001/api/books/${id}/tile_entries?page=${pageNum}`
  );
};

const getUserEntries = async (user, pageNum) => {
  return await axios.get(
    `http://localhost:3001/api/users/${user.data.user.id}/tile_entries/all_user_entries?page=${pageNum}`
  );
};

const getFavBooks = async (user, context, pageNum = 1) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/fav_books?page=${pageNum}`,
    headers: { cookie: context.req.headers.cookie },
  });
};

const getFavEntries = async (user, context, pageNum = 1) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/fav_tile_entries?page=${pageNum}`,
    headers: { cookie: context.req.headers.cookie },
  });
};

const getFollowers = async (user, context, pageNum) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/followers?page=${pageNum}`,
    headers: { cookie: context.req.headers.cookie },
  });
};

const getFollowing = async (user, context, pageNum) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/following?page=${pageNum}`,
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

const getAllFollowers = async (user, context) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/unpaged_followers`,
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

const searchBooks = async (keywords, context, pageNum) => {
  return await axios({
    method: "post",
    data: { keywords: JSON.stringify(keywords), page_num: pageNum },
    url: "http://localhost:3001/api/search/books",
    headers: { cookie: context.req.headers.cookie },
  });
};

const isBookTileAvailable = async (user, context) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/book_tiles/${context.params.id}/is_available`,
    headers: { cookie: context.req.headers.cookie },
  });
};

const getFavCategories = async (user, context) => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${user.data.user.id}/fav_categories`,
    headers: { cookie: context.req.headers.cookie },
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
  getFavBooks,
  getFollowing,
  getFollowers,
  getAllFollowing,
  getAllFollowers,
  getFavEntries,
  getUpvotedEntries,
  getDownvotedEntries,
  searchBooks,
  getFavCategories,
};
