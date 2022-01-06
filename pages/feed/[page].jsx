import { useState } from "react";
import { getEntries } from "../../lib/serverSideMethods";
import FeedEntry from "../../components/feed/FeedEntry";

import {
  getLoggedUser,
  getAllFollowing,
  getFavBooks,
  getFavEntries,
  getUpvotedEntries,
  getDownvotedEntries,
} from "../../lib/serverSideMethods";

export const getServerSideProps = async (context) => {
  const pageNum = context.params.page;
  const entries = await getEntries(pageNum);

  try {
    const loggedUser = await getLoggedUser(context);
    const following = await getAllFollowing(loggedUser, context);
    const favBooks = await getFavBooks(loggedUser, context);
    const favInsights = await getFavEntries(loggedUser, context);
    const upvotedEntries = await getUpvotedEntries(loggedUser, context);
    const downvotedEntries = await getDownvotedEntries(loggedUser, context);

    return {
      props: {
        entries: entries.data.entries,
        pagy: entries.data.pagy,
        following: following.data,
        favBooks: favBooks.data.books,
        favInsights: favInsights.data.tile_entries,
        entriesUp: upvotedEntries.data.upvoted_entries,
        entriesDown: downvotedEntries.data.downvoted_entries,
      },
    };
  } catch (error) {
    return {
      props: { entries: entries.data.entries, pagy: entries.data.pagy },
    };
  }
};

const Feed = ({
  entries,
  pagy,
  userState,
  following,
  favInsights,
  entriesUp,
  entriesDown,
}) => {
  // const [entries, setEntries] = useState(entriesProp);
  const [followedUsers, setFollowedUsers] = useState(following);
  const [insights, setInsights] = useState(favInsights);
  const [upvotedEntries, setUpvotedEntries] = useState(entriesUp);
  const [downvotedEntries, setDownvotedEntries] = useState(entriesDown);

  return (
    <div>
      <div className="bg-feed bg-cover bg-center shadow">
        <div className="bg-gray-800 bg-opacity-70 text-white text-2xl md:text-3xl font-medium text-center py-12">
          Latest insights from all creators
        </div>
      </div>

      <div>
        <FeedEntry
          userState={userState}
          entry={entries[0]}
          insights={insights}
          setInsights={setInsights}
          followedUsers={followedUsers}
          setFollowedUsers={setFollowedUsers}
          upvotedEntries={upvotedEntries}
          setUpvotedEntries={setUpvotedEntries}
          downvotedEntries={downvotedEntries}
          setDownvotedEntries={setDownvotedEntries}
        />
      </div>
    </div>
  );
};

export default Feed;
