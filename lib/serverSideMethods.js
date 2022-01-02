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

export { getLoggedUser, getFavBooks };
