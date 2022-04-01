import axios from "axios";

const getEntryComments = async (entryId) => {
  return await axios({
    method: "get",
    url: `${process.env.BASE_URL}/tile_entries/${entryId}/comments`,
  });
};

const loadComments = async (entryId, setComments, showComments ) => {
  const resp = await getEntryComments(entryId);
  setComments([...resp.data]);
  showComments();
};

export { loadComments };
