import axios from "axios";

export const getServerSideProps = async (context) => {
  const resp = await axios({
    method: "get",
    url: "http://localhost:3001/api/logged_in",
    headers: { cookie: context.req.headers.cookie },
  });

  const userId = resp.data.user.id;

  const tiles = await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${userId}/book_tiles`,
  });

  return {
    props: {
      tiles: tiles.data,
    },
  };
};

const UserBookTiles = ({ tiles }) => {
  return <div></div>;
};

export default UserBookTiles;
