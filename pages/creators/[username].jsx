import axios from "axios";
import { useState } from "react";
import BasicInfo from "../../components/creators/BasicInfo";
import LatestBooks from "../../components/creators/LatestBooks";
import LatestEntries from "../../components/creators/LatestEntries";

export const getServerSideProps = async (context) => {
  const username = context.query.username;

  const user = await axios.get(`http://localhost:3001/api/users/${username}`);

  try {
    const userResp = await axios({
      method: "get",
      url: "http://localhost:3001/api/logged_in",
      headers: { cookie: context.req.headers.cookie },
    });

    const following = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/unpaged_following`,
      headers: { cookie: context.req.headers.cookie },
    });

    const favBooks = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/fav_books`,
      headers: { cookie: context.req.headers.cookie },
    });

    const favInsights = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/fav_tile_entries`,
      headers: { cookie: context.req.headers.cookie },
    });

    const upvotedEntries = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/upvoted_entries`,
      headers: { cookie: context.req.headers.cookie },
    });

    const downvotedEntries = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/downvoted_entries`,
      headers: { cookie: context.req.headers.cookie },
    });

    return {
      props: {
        user: user.data,
        following: following.data,
        favBooks: favBooks.data.books,
        favInsights: favInsights.data.tile_entries,
        entriesUp: upvotedEntries.data.upvoted_entries,
        entriesDown: downvotedEntries.data.downvoted_entries,
      },
    };
  } catch (error) {
    return {
      props: { user: user.data },
    };
  }
};

const Username = ({
  user,
  userState,
  following,
  favBooks,
  favInsights,
  entriesUp,
  entriesDown,
}) => {
  const selectLatestEntries = () => {
    const definedBookTiles = user.book_tiles
      .filter((book_tile) => book_tile.tile_entries.length != 0)
      .slice(0, 3);

    const recentEntries = definedBookTiles.map(
      (book_tile) => book_tile.tile_entries[0]
    );

    return recentEntries;
  };

  const [latestEntries, setLatestEntries] = useState(selectLatestEntries());

  const [followedUsers, setFollowedUsers] = useState(following);
  const [insights, setInsights] = useState(favInsights);
  const [upvotedEntries, setUpvotedEntries] = useState(entriesUp);
  const [downvotedEntries, setDownvotedEntries] = useState(entriesDown);

  return (
    <div>
      <div>
        <BasicInfo user={user} />
      </div>

      <div className="mt-10">
        <LatestBooks books={user.book_tiles.map((tile) => tile.book)} />
      </div>

      <div className="mt-10">
        <LatestEntries
          entries={latestEntries}
          userState={userState}
          favBooks={favBooks}
          insights={insights}
          setInsights={setInsights}
          upvotedEntries={upvotedEntries}
          setUpvotedEntries={setUpvotedEntries}
          downvotedEntries={downvotedEntries}
          setDownvotedEntries={setDownvotedEntries}
          followedUsers={followedUsers}
          setFollowedUsers={setFollowedUsers}
        />
      </div>
    </div>
  );
};

export default Username;
