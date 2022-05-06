import Head from "next/head";
import { useState } from "react";
import BasicInfo from "../../../components/creators/BasicInfo";
import LatestBooks from "../../../components/creators/LatestBooks";
import LatestEntries from "../../../components/creators/LatestEntries";
import { isLogged } from "../../../lib/auth";

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

  if (isLogged(context)) {
    const loggedUser = await getLoggedUser(context);
    const [following, favBooks, favInsights, upvotedEntries, downvotedEntries] =
      await Promise.all([
        getAllFollowing(loggedUser, context),
        getFavBooks(loggedUser, context),
        getAllFavEntries(loggedUser, context),
        getUpvotedEntries(loggedUser, context),
        getDownvotedEntries(loggedUser, context),
      ]);

    return {
      props: {
        user: user.data,
        following: following.data,
        favBooks: favBooks.data.results,
        favInsights: favInsights.data.tile_entries,
        entriesUp: upvotedEntries.data.upvoted_entries,
        entriesDown: downvotedEntries.data.downvoted_entries,
      },
    };
  } else {
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
  addOverlay,
  removeOverlay,
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
    <div className="relative pt-10">
      <Head>
        <title>Creator: {user.user.username}</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <div className="mt-10">
        <BasicInfo
          user={user}
          following={followedUsers}
          setFollowedUsers={setFollowedUsers}
          userState={userState}
        />
      </div>

      <div className="mt-20">
        <LatestBooks
          userId={user.user.id}
          books={user.book_tiles.map((tile) => tile.book)}
          userState={userState}
          insights={insights}
          setInsights={setInsights}
          upvotedEntries={upvotedEntries}
          setUpvotedEntries={setUpvotedEntries}
          downvotedEntries={downvotedEntries}
          setDownvotedEntries={setDownvotedEntries}
          followedUsers={followedUsers}
          setFollowedUsers={setFollowedUsers}
          addOverlay={addOverlay}
          removeOverlay={removeOverlay}
        />
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
