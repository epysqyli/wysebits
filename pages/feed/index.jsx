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
  getGuestFeed,
  getUserFeed,
  getFavCategoriesFeed,
  getFollowingFeed,
} from "../../lib/serverSideMethods";

import { updateFeed } from "../../lib/feedMethods";

import { Grid, Globe, Users } from "react-feather";

export const getServerSideProps = async (context) => {
  try {
    const loggedUser = await getLoggedUser(context);
    const entries = await getUserFeed(loggedUser, context, 1);
    const favCatsEntries = await getFavCategoriesFeed(loggedUser, context, 1);
    const followingEntries = await getFollowingFeed(loggedUser, context, 1);
    const following = await getAllFollowing(loggedUser, context);
    const favBooks = await getFavBooks(loggedUser, context);
    const favInsights = await getFavEntries(loggedUser, context);
    const upvotedEntries = await getUpvotedEntries(loggedUser, context);
    const downvotedEntries = await getDownvotedEntries(loggedUser, context);

    return {
      props: {
        entriesProps: entries.data.entries,
        pagy: entries.data.pagy,
        favCatsEntriesProps: favCatsEntries.data.entries,
        favCatsPagy: favCatsEntries.data.pagy,
        followingEntriesProps: followingEntries.data.entries,
        followingPagy: followingEntries.data.pagy,
        feedType: "user_feed",

        following: following.data,
        favBooks: favBooks.data.books,
        favInsights: favInsights.data.tile_entries,
        entriesUp: upvotedEntries.data.upvoted_entries,
        entriesDown: downvotedEntries.data.downvoted_entries,
      },
    };
  } catch (error) {
    const entries = await getGuestFeed(1);

    return {
      props: {
        entriesProps: entries.data.entries,
        pagy: entries.data.pagy,
        feedType: "guest_feed",
      },
    };
  }
};

const Feed = ({
  entriesProps,
  pagy,
  favCatsEntriesProps,
  favCatsPagy,
  followingEntriesProps,
  followingPagy,
  userState,
  following,
  favInsights,
  entriesUp,
  entriesDown,
  feedType,
}) => {
  const [selectedEntries, setSelectedEntries] = useState([]);

  const [globalEntries, setGlobalEntries] = useState(entriesProps);
  const [currentSelection, setCurrentSelection] = useState(feedType);
  const [nextPage, setNextPage] = useState(pagy.next);

  const [favCatsEntries, setFavCatsEntries] = useState(favCatsEntriesProps);
  const [favCatsNextPage, setFavCatsNextPage] = useState(
    favCatsPagy ? favCatsPagy.next : null
  );

  const [followingEntries, setFollowingEntries] = useState(
    followingEntriesProps
  );
  const [followingNextPage, setFollowingNextPage] = useState(
    followingPagy ? followingPagy.next : null
  );

  const [initialLoad, setInitialLoad] = useState(false);
  const [followedUsers, setFollowedUsers] = useState(following);
  const [insights, setInsights] = useState(favInsights);
  const [upvotedEntries, setUpvotedEntries] = useState(entriesUp);
  const [downvotedEntries, setDownvotedEntries] = useState(entriesDown);

  const updateFeedGuest = async () => {
    const newEntries = await getGuestFeed(nextPage);
    setGlobalEntries([...globalEntries, ...newEntries.data.entries]);
    setSelectedEntries([...globalEntries, ...newEntries.data.entries]);
    setNextPage(newEntries.data.pagy.next);
  };

  const updateFeedState = async (
    currentEntries,
    setEntriesState,
    pageNext,
    setPageState
  ) => {
    const newEntries = await updateFeed(
      userState.user,
      currentSelection,
      pageNext
    );
    setEntriesState([...currentEntries, ...newEntries.data.entries]);
    setSelectedEntries([...currentEntries, ...newEntries.data.entries]);
    setPageState(newEntries.data.pagy.next);
  };

  const getMoreEntries = async () => {
    if (currentSelection === "guest_feed") await updateFeedGuest();

    if (currentSelection === "user_feed")
      await updateFeedState(
        globalEntries,
        setGlobalEntries,
        nextPage,
        setNextPage
      );

    if (currentSelection === "categories_feed")
      await updateFeedState(
        favCatsEntries,
        setFavCatsEntries,
        favCatsNextPage,
        setFavCatsNextPage
      );

    if (currentSelection === "following_feed")
      await updateFeedState(
        followingEntries,
        setFollowingEntries,
        followingNextPage,
        setFollowingNextPage
      );
  };

  // avoid initial loading UI error
  useEffect(() => {
    setSelectedEntries(entriesProps);
    setInitialLoad(true);
  }, []);

  if (userState.isLogged === true) {
    const selectGlobalEntries = () => {
      setCurrentSelection("user_feed");
      setSelectedEntries(globalEntries);
    };

    const selectFavCatsEntries = () => {
      setCurrentSelection("categories_feed");
      setSelectedEntries(favCatsEntries);
    };

    const selectFollowingEntries = () => {
      setCurrentSelection("following_feed");
      setSelectedEntries(followingEntries);
    };

    return (
      <div>
        <div className="bg-feed bg-cover bg-center shadow">
          <div className="bg-gray-800 bg-opacity-70 text-white text-2xl md:text-3xl font-medium text-center py-12">
            Latest insights
          </div>
        </div>

        <div className="flex items-center md:mt-5 md:w-4/5 xl:w-4/6 2xl:w-1/2 mx-auto">
          <div
            className={`text-gray-600 w-1/2 py-4 text-center transition-all hover:text-black ${
              currentSelection === "following_feed"
                ? "bg-gray-200 inner-shadow text-black rounded-br-md md:rounded-md"
                : "cursor-pointer opacity-30"
            }`}
            onClick={selectFollowingEntries}
          >
            <Users size={32} strokeWidth={1.5} className="mx-auto" />
            <div className="mt-3">Followed users</div>
          </div>

          <div
            className={`text-gray-600 w-1/2 py-4 text-center transition-all hover:text-black ${
              currentSelection === "categories_feed"
                ? "bg-gray-200 inner-shadow text-black rounded-bl-md rounded-br-md md:rounded-md"
                : "cursor-pointer opacity-30"
            }`}
            onClick={selectFavCatsEntries}
          >
            <Grid size={32} strokeWidth={1.5} className="mx-auto" />
            <div className="mt-3">Favorite categories</div>
          </div>

          <div
            className={`text-gray-600 w-1/2 py-4 text-center transition-all hover:text-black ${
              currentSelection === "user_feed"
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

        <div
          className="mx-auto my-10 w-3/5 md:w-2/5 lg:w-2/6 xl:w-1/4"
          onClick={getMoreEntries}
        >
          <FeedLoader
            nextPage={nextPage}
            favCatsNextPage={favCatsNextPage}
            currentSelection={currentSelection}
            followingNextPage={followingNextPage}
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

      <div
        className="mx-auto my-10 w-3/5 md:w-2/5 lg:w-2/6 xl:w-1/4"
        onClick={getMoreEntries}
      >
        <FeedLoader nextPage={nextPage} currentSelection={currentSelection} />
      </div>
    </div>
  );
};

export default Feed;
