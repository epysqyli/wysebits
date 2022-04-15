import Head from "next/head";
import { useState, useEffect } from "react";
import FeedEntry from "../../components/feed/FeedEntry";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  getLoggedUser,
  getAllFollowing,
  getAllFavEntries,
  getUpvotedEntries,
  getDownvotedEntries,
} from "../../lib/serverSideMethods";

import {
  updateFeed,
  getGuestFeed,
  getUserFeed,
  getFavCategoriesFeed,
  getFollowingFeed,
} from "../../lib/feedMethods";

import { Grid, Globe, Users, Info } from "react-feather";

export const getServerSideProps = async (context) => {
  try {
    const loggedUser = await getLoggedUser(context);

    const [
      entries,
      favCatsEntries,
      followingEntries,
      following,
      favInsights,
      upvotedEntries,
      downvotedEntries,
    ] = await Promise.all([
      getUserFeed(loggedUser, context, 1),
      getFavCategoriesFeed(loggedUser, context, 1),
      getFollowingFeed(loggedUser, context, 1),
      getAllFollowing(loggedUser, context),
      getAllFavEntries(loggedUser, context),
      getUpvotedEntries(loggedUser, context),
      getDownvotedEntries(loggedUser, context),
    ]);

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
  addOverlay,
  removeOverlay,
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

  const feedEnd = (
    <div className="flex justify-around items-center mx-auto w-3/5 md:w-2/5 xl:w-1/4 mt-5 py-20 border-t-2 text-white">
      <Info size={32} strokeWidth={1.5} />
      <div>No more entries available</div>
    </div>
  );

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
      <div className="pt-10 lg:pt-16">
        <Head>
          <title>Feed - Wysebits</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <div className="bg-feed bg-cover bg-center lg:shadow border-b-2 border-white lg:w-4/5 2xl:w-1/2 lg:mt-5 lg:rounded-md mx-auto lg:mb-20">
          <div className="bg-gray-800 bg-opacity-70 text-white text-4xl font-bold text-center py-16 lg:rounded-md">
            Latest insights
          </div>
        </div>

        <div className="flex items-center md:mt-5 md:w-4/5 xl:w-4/6 2xl:w-1/2 mx-auto md:gap-x-2 my-1">
          <div
            className={`text-gray-200 w-1/2 py-4 text-center rounded md:border-2 transition-all hover:text-black ${
              currentSelection === "following_feed"
                ? "md:border-gray-300 bg-gray-50 inner-shadow text-black"
                : "cursor-pointer opacity-30"
            }`}
            onClick={selectFollowingEntries}
          >
            <Users size={32} strokeWidth={1.5} className="mx-auto" />
            <div className="mt-3">Followed users</div>
          </div>

          <div
            className={`text-gray-200 w-1/2 py-4 text-center rounded md:border-2 transition-all hover:text-black ${
              currentSelection === "categories_feed"
                ? "md:border-gray-300 bg-gray-50 inner-shadow text-black"
                : "cursor-pointer opacity-30"
            }`}
            onClick={selectFavCatsEntries}
          >
            <Grid size={32} strokeWidth={1.5} className="mx-auto" />
            <div className="mt-3">Liked categories</div>
          </div>

          <div
            className={`text-gray-200 w-1/2 py-4 text-center rounded md:border-2 transition-all hover:text-black ${
              currentSelection === "user_feed"
                ? "md:border-gray-300 bg-gray-50 inner-shadow text-black"
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
                      addOverlay={addOverlay}
                      removeOverlay={removeOverlay}
                    />
                  </div>
                );
              })
            : null}
        </div>

        <InfiniteScroll
          dataLength={selectedEntries.length}
          next={getMoreEntries}
          hasMore={
            currentSelection == "user_feed" && nextPage !== null
              ? true
              : false ||
                (currentSelection == "categories_feed" &&
                  favCatsNextPage !== null)
              ? true
              : false ||
                (currentSelection == "following_feed" &&
                  followingNextPage !== null)
              ? true
              : false
          }
          endMessage={feedEnd}
        />
      </div>
    );
  }

  return (
    <div className="pt-10 lg:pt-16">
      <Head>
        <title>Feed - Wysebits</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="bg-feed bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:my-5 lg:rounded-md mx-auto lg:mb-20">
        <div className="bg-gray-800 bg-opacity-70 text-white text-4xl font-bold text-center py-16 lg:rounded-md">
          Latest insights
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
        <InfiniteScroll
          dataLength={selectedEntries.length}
          next={getMoreEntries}
          hasMore={nextPage !== null ? true : false}
          endMessage={feedEnd}
        />
      </div>
    </div>
  );
};

export default Feed;
