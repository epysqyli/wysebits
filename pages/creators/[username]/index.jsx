import { useState } from "react";
import BasicInfo from "../../../components/creators/BasicInfo";
import LatestBooks from "../../../components/creators/LatestBooks";
import LatestEntries from "../../../components/creators/LatestEntries";
import {
  getUser,
  getLoggedUser,
  getAllFollowing,
  getFavBooks,
  getAllFavEntries,
  getUpvotedEntries,
  getDownvotedEntries,
} from "../../../lib/serverSideMethods";

export const getServerSideProps = async (context) => {
  const username = context.query.username;
  const user = await getUser(username);

  try {
    const loggedUser = await getLoggedUser(context);
    const following = await getAllFollowing(loggedUser, context);
    const favBooks = await getFavBooks(loggedUser, context);
    const favInsights = await getAllFavEntries(loggedUser, context);
    const upvotedEntries = await getUpvotedEntries(loggedUser, context);
    const downvotedEntries = await getDownvotedEntries(loggedUser, context);

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
        <BasicInfo
          user={user}
          following={followedUsers}
          setFollowedUsers={setFollowedUsers}
          userState={userState}
        />
      </div>

      <div className="mt-20">
        <LatestBooks books={user.book_tiles.map((tile) => tile.book)} />
      </div>

      <div className="mt-20">
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
