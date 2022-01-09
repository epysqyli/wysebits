import { useState, useEffect } from "react";
import FeedEntry from "../../components/feed/FeedEntry";
import FeedLoader from "../../components/feed/FeedLoader";

import {
  getLoggedUser,
  getAllFollowing,
  getFavBooks,
  getFavEntries,
  getUpvotedEntries,
  getDownvotedEntries,
  getFeed,
  getCustomFeed,
} from "../../lib/serverSideMethods";

import { updateCustomFeed } from "../../lib/feedMethods";

import { Grid, Globe } from "react-feather";

export const getServerSideProps = async (context) => {
  const entries = await getFeed(1);

  try {
    const loggedUser = await getLoggedUser(context);
    const following = await getAllFollowing(loggedUser, context);
    const favBooks = await getFavBooks(loggedUser, context);
    const favInsights = await getFavEntries(loggedUser, context);
    const upvotedEntries = await getUpvotedEntries(loggedUser, context);
    const downvotedEntries = await getDownvotedEntries(loggedUser, context);
    const customEntries = await getCustomFeed(loggedUser, context, 1);

    return {
      props: {
        entriesProps: entries.data.entries,
        pagy: entries.data.pagy,
        following: following.data,
        favBooks: favBooks.data.books,
        favInsights: favInsights.data.tile_entries,
        entriesUp: upvotedEntries.data.upvoted_entries,
        entriesDown: downvotedEntries.data.downvoted_entries,
        customEntriesProps: customEntries.data.entries,
        customPagy: customEntries.data.pagy,
      },
    };
  } catch (error) {
    return {
      props: {
        entriesProps: entries.data.entries,
        pagy: entries.data.pagy,
      },
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
  customEntriesProps,
  customPagy,
}) => {
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [globalEntries, setGlobalEntries] = useState(entriesProps);
  const [currentSelection, setCurrentSelection] = useState("global");
  const [nextPage, setNextPage] = useState(pagy.next);

  const [initialLoad, setInitialLoad] = useState(false);
  const [followedUsers, setFollowedUsers] = useState(following);
  const [insights, setInsights] = useState(favInsights);
  const [upvotedEntries, setUpvotedEntries] = useState(entriesUp);
  const [downvotedEntries, setDownvotedEntries] = useState(entriesDown);

  const selectGlobalEntries = () => {
    setCurrentSelection("global");
    setSelectedEntries(globalEntries);
  };

  const getMoreEntries = async () => {
    if (currentSelection === "global") {
      const newEntries = await getFeed(nextPage);
      setGlobalEntries([...globalEntries, ...newEntries.data.entries]);
      setSelectedEntries([...globalEntries, ...newEntries.data.entries]);
      setNextPage(newEntries.data.pagy.next);
    }

    if (currentSelection === "custom") {
      const newEntries = await updateCustomFeed(userState.user, customNextPage);
      setCustomEntries([...customEntries, ...newEntries.data.entries]);
      setSelectedEntries([...customEntries, ...newEntries.data.entries]);
      setCustomNextPage(newEntries.data.pagy.next);
    }
  };

  useEffect(() => {
    setSelectedEntries(entriesProps);
    setInitialLoad(true);
  }, []);

  if (userState.isLogged === true) {
    const [customEntries, setCustomEntries] = useState(customEntriesProps);
    const [customNextPage, setCustomNextPage] = useState(customPagy.next);

    const selectCustomEntries = () => {
      setCurrentSelection("custom");
      setSelectedEntries(customEntries);
    };

    return (
      <div>
        <div className="bg-feed bg-cover bg-center shadow">
          <div className="bg-gray-800 bg-opacity-70 text-white text-2xl md:text-3xl font-medium text-center py-12">
            Latest insights from all creators
          </div>
        </div>

        <div className="flex items-center md:mt-5 md:w-4/5 xl:w-4/6 2xl:w-1/2 mx-auto">
          <div
            className={`text-gray-600 w-1/2 py-4 text-center transition-all ${
              currentSelection === "custom"
                ? "bg-gray-200 inner-shadow text-black rounded-br-md md:rounded-md"
                : "cursor-pointer opacity-30"
            }`}
            onClick={selectCustomEntries}
          >
            <Grid size={32} strokeWidth={1.5} className="mx-auto" />
            <div className="mt-3">Favorite categories</div>
          </div>
          <div
            className={`text-gray-600 w-1/2 py-4 text-center transition-all ${
              currentSelection === "global"
                ? "bg-gray-200 inner-shadow text-black rounded-bl-md md:rounded-md"
                : "cursor-pointer opacity-30"
            }`}
            onClick={selectGlobalEntries}
          >
            <Globe size={32} strokeWidth={1.5} className="mx-auto" />
            <div className="mt-3">Global feed</div>
          </div>
        </div>

        <div>
          {initialLoad == true
            ? selectedEntries.map((entry) => {
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

        <div className="mx-auto my-10 w-3/5 md:w-2/5 lg:w-2/6 xl:w-1/4">
          <FeedLoader
            nextPage={nextPage}
            customNextPage={customNextPage}
            currentSelection={currentSelection}
            getMoreEntries={getMoreEntries}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-feed bg-cover bg-center shadow">
        <div className="bg-gray-800 bg-opacity-70 text-white text-2xl md:text-3xl font-medium text-center py-12">
          Latest insights from all creators
        </div>
      </div>

      <div>
        {initialLoad == true
          ? selectedEntries.map((entry) => {
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

      <div className="mx-auto my-10 w-3/5 md:w-2/5 lg:w-2/6 xl:w-1/4">
        <FeedLoader
          nextPage={nextPage}
          currentSelection={currentSelection}
          getMoreEntries={getMoreEntries}
        />
      </div>
    </div>
  );
};

export default Feed;
