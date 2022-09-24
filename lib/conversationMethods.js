import axios from "axios";

const getUserConversations = async (userId, context) => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/users/${userId}/conversations`,
    headers: { cookie: context.req.headers.cookie }
  });
};

const getMessages = async (conversationId, context) => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/conversations/${conversationId}/messages`,
    headers: { cookie: context.req.headers.cookie }
  });
};

const sendMessage = async (conversationId, content, userId) => {
  return await axios({
    method: "POST",
    url: `${process.env.BASE_URL}/conversations/${conversationId}/messages`,
    data: { content: content, user_id: userId },
    withCredentials: true
  });
};

const findOrCreateConversation = async (senderId, recipientId) => {
  return await axios({
    method: "POST",
    url: `${process.env.BASE_URL}/users/${senderId}/conversations`,
    data: { sender_id: senderId, recipient_id: recipientId },
    withCredentials: true
  });
};

export { getUserConversations, getMessages, sendMessage, findOrCreateConversation };
