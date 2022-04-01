import axios from "axios";

const getEntryComments = async (entryId) => {
  return await axios({
    method: "get",
    url: `${process.env.BASE_URL}/tile_entries/${entryId}/comments`,
  });
};

const loadComments = async (entryId, setComments, showComments) => {
  const resp = await getEntryComments(entryId);
  setComments([...resp.data]);
  showComments();
};

const postComment = async (entryId, content) => {
  const resp = await axios({
    method: "POST",
    url: `${process.env.BASE_URL}/tile_entries/${entryId}/comments`,
    data: { content: content, commentable_id: entryId },
    withCredentials: true,
  });
};

export { loadComments, postComment };
