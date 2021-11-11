import axios from "axios";

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const userResp = await axios({
    method: "get",
    url: "http://localhost:3001/api/logged_in",
    headers: { cookie: context.req.headers.cookie },
  });

  const resp = await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${userResp.data.user.id}/book_tiles/${id}`,
    withCredentials: true,
  });

  return {
    props: {
      book: resp.data.book,
      entries: resp.data.tile_entries,
    },
  };
};

const EditBookTile = ({ book, tile_entries }) => {
  return <div></div>;
};

export default EditBookTile;
