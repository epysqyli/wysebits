import axios from "axios";

const getUserConversations = async (userId, context) => {
  return await axios({
    method: "GET",
    url: `http://localhost:3001/api/users/${userId}/conversations`,
    headers: { cookie: context.req.headers.cookie },
  });
};

export { getUserConversations };
