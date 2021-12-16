import axios from "axios";
import BasicInfo from "../../components/creators/BasicInfo";
import LatestBooks from "../../components/creators/LatestBooks";
import LatestTiles from "../../components/creators/LatestTiles";

export const getServerSideProps = async ({ params }) => {
  const username = params.username;

  const user = await axios.get(`http://localhost:3001/api/users/${username}`);

  return {
    props: { user: user.data },
  };
};

const Username = ({ user }) => {
  return (
    <div>
      <div>
        <BasicInfo user={user} />
      </div>

      <div className="mt-10">
        <LatestBooks books={user.book_tiles.map((tile) => tile.book)} />
      </div>
    </div>
  );
};

export default Username;
