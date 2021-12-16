import axios from "axios";
import { useState } from "react";
import BasicInfo from "../../components/creators/BasicInfo";
import LatestBooks from "../../components/creators/LatestBooks";
import LatestEntries from "../../components/creators/LatestEntries";

export const getServerSideProps = async ({ params }) => {
  const username = params.username;

  const user = await axios.get(`http://localhost:3001/api/users/${username}`);

  return {
    props: { user: user.data },
  };
};

const Username = ({ user, userState }) => {
  const [latestEntries, setLatestEntries] = useState(
    user.book_tiles.map((book_tile) => book_tile.tile_entries[0]).slice(0, 3)
  );

  return (
    <div>
      <div>
        <BasicInfo user={user} />
      </div>

      <div className="mt-10">
        <LatestBooks books={user.book_tiles.map((tile) => tile.book)} />
      </div>

      <div className="mt-10">
        <LatestEntries entries={latestEntries} isLogged={userState.isLogged} />
      </div>
    </div>
  );
};

export default Username;
