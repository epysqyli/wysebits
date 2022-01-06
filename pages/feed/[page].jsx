import { useState, useEffect } from "react";
import { getEntries } from "../../lib/serverSideMethods";
import FeedEntry from "../../components/feed/FeedEntry";
import Button from "../../components/navigation/Button";

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
        entriesProps: entries.data.entries,
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
      props: { entriesProps: entries.data.entries, pagy: entries.data.pagy },
    };
  }
};

const Feed = ({
  entriesProps,
  pagy,
  userState,
  following,
  favInsights,
  entriesUp,
  entriesDown,
}) => {
  const [entries, setEntries] = useState([]);
  const [initialLoad, setInitialLoad] = useState(false);
  const [followedUsers, setFollowedUsers] = useState(following);
  const [insights, setInsights] = useState(favInsights);
  const [upvotedEntries, setUpvotedEntries] = useState(entriesUp);
  const [downvotedEntries, setDownvotedEntries] = useState(entriesDown);

  useEffect(() => {
    setEntries(...entries, entriesProps);
    setInitialLoad(true);
  }, []);

  return (
    <div>
      <div className="bg-feed bg-cover bg-center shadow">
        <div className="bg-gray-800 bg-opacity-70 text-white text-2xl md:text-3xl font-medium text-center py-12">
          Latest insights from all creators
        </div>
      </div>

      <div>
        {initialLoad == true
          ? entries.map((entry) => {
              return (
                <div key={entry.id}>
                  <FeedEntry
                    userState={userState}
                    entry={entry}
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
              );
            })
          : null}
      </div>

      <div className="text-center my-5">
        <Button text="Load more entries" />
      </div>
    </div>
  );
};

export default Feed;
