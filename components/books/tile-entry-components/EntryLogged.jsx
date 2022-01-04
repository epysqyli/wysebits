import {
  ThumbsUp,
  ThumbsDown,
  Heart,
  ArrowUpRight,
  UserMinus,
  UserPlus,
} from "react-feather";

import axios from "axios";
import Link from "next/dist/client/link";

import {
  removeInsightFromState,
  addInsightToState,
  removeUpEntryFromState,
  addUpEntryToState,
  addDownEntryToState,
  removeDownEntryFromState,
} from "../../../lib/tileEntryMethods";

import {
  isFollowed,
  followAndUpdateState,
  unfollowAndUpdateState,
} from "../../../lib/followMethods";

const EntryLogged = ({
  entryProp,
  user,
  insights,
  setInsights,
  upvotedEntries,
  setUpvotedEntries,
  downvotedEntries,
  setDownvotedEntries,
  followedUsers,
  setFollowedUsers,
}) => {
  const entryUser = entryProp.book_tile.user;

  // methods related to like/heart functionalities
  const isFavInsight = () => {
    return insights.some((insight) => insight.id === entryProp.id);
  };

  const addToFavInsights = () => {
    axios
      .post(
        `http://localhost:3001/api/users/${userId}/fav_tile_entries/${entryProp.id}`,
        {},
        { withCredentials: true }
      )
      .then((res) => addInsightToState(entryProp, insights, setInsights))
      .catch((err) => console.log(err));
  };

  const removeFromFavInsights = () => {
    axios
      .delete(
        `http://localhost:3001/api/users/${userId}/fav_tile_entries/${entryProp.id}`,
        { withCredentials: true }
      )
      .then((res) => removeInsightFromState(entryProp, insights, setInsights))
      .catch((err) => console.log(err));
  };

  // methods related to upvote and downvote functionalities
  const isUpvoted = () => {
    return upvotedEntries.some((entry) => entry.id == entryProp.id);
  };

  const isDownvoted = () => {
    return downvotedEntries.some((entry) => entry.id == entryProp.id);
  };

  const addToUpvoted = () => {
    axios
      .post(
        `http://localhost:3001/api/users/${userId}/tile_entries/${entryProp.id}/upvote`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        if (isDownvoted()) {
          removeFromDownvoted();
        }
        addUpEntryToState(entryProp, upvotedEntries, setUpvotedEntries);
      })
      .catch((err) => console.log(err));
  };

  const removeFromUpvoted = () => {
    axios
      .post(
        `http://localhost:3001/api/users/${userId}/tile_entries/${entryProp.id}/remove_upvote`,
        {},
        { withCredentials: true }
      )
      .then((res) =>
        removeUpEntryFromState(entryProp, upvotedEntries, setUpvotedEntries)
      )
      .catch((err) => console.log(err));
  };

  const addToDownvoted = () => {
    axios
      .post(
        `http://localhost:3001/api/users/${userId}/tile_entries/${entryProp.id}/downvote`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        if (isUpvoted()) {
          removeFromUpvoted();
        }
        addDownEntryToState(entryProp, downvotedEntries, setDownvotedEntries);
      })
      .catch((err) => console.log(err));
  };

  const removeFromDownvoted = () => {
    axios
      .post(
        `http://localhost:3001/api/users/${userId}/tile_entries/${entryProp.id}/remove_downvote`,
        {},
        { withCredentials: true }
      )
      .then((res) =>
        removeDownEntryFromState(entryProp, downvotedEntries, setDownvotedEntries)
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="shadow-md rounded-md">
      <div className="border-b-2 py-5 px-10 md:px-16 font-light whitespace-pre-line">
        {entryProp.content}
      </div>

      <div className="flex justify-between items-center text-sm px-10 md:px-16 py-4">
        <div className="flex justify-center items-center gap-x-3">
          {isUpvoted() ? (
            <div onClick={() => removeFromUpvoted()}>
              <ThumbsUp
                size={16}
                fill="darkgray"
                color="darkgray"
                className="transition-all hover:scale-105 active:scale-125 cursor-pointer"
              />
            </div>
          ) : (
            <div onClick={() => addToUpvoted()}>
              <ThumbsUp
                size={16}
                color="darkgray"
                className="transition-all hover:scale-105 active:scale-125 cursor-pointer"
              />
            </div>
          )}

          <div className="text-gray-600">{entryProp.upvotes - entryProp.downvotes}</div>

          {isDownvoted() ? (
            <div onClick={() => removeFromDownvoted()}>
              <ThumbsDown
                size={16}
                fill="darkgray"
                color="darkgray"
                className="transition-all hover:scale-105 active:scale-125 cursor-pointer"
              />
            </div>
          ) : (
            <div onClick={() => addToDownvoted()}>
              <ThumbsDown
                size={16}
                color="darkgray"
                className="transition-all hover:scale-105 active:scale-125 cursor-pointer"
              />
            </div>
          )}

          <div className="ml-3 flex items-center">
            {isFavInsight() ? (
              <div onClick={() => removeFromFavInsights()}>
                <Heart
                  size={16}
                  fill="darkgray"
                  color="darkgray"
                  className="transition-all hover:scale-105 active:scale-125 cursor-pointer"
                />
              </div>
            ) : (
              <div onClick={() => addToFavInsights()}>
                <Heart
                  size={16}
                  color="darkgray"
                  className="transition-all hover:scale-105 active:scale-125 cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        <div className="group flex items-center gap-x-2 transition-all">
          <Link href={`/creators/${entryProp.book_tile.user.username}`}>
            <div className="flex items-center gap-x-1">
              <div className="text-gray-600 active:text-gray-200 cursor-pointer">
                {entryProp.book_tile.user.username}
              </div>
              <ArrowUpRight
                size={18}
                className="text-gray-600 group-hover:scale-110"
              />
            </div>
          </Link>

          {user.id !== entryUser.id ? (
            isFollowed(followedUsers, entryUser) ? (
              <div
                className="cursor-pointer hover:scale-110 text-gray-600"
                onClick={() =>
                  unfollowAndUpdateState(
                    user,
                    entryUser,
                    followedUsers,
                    setFollowedUsers
                  )
                }
              >
                <UserMinus size={16} />
              </div>
            ) : (
              <div
                className="cursor-pointer hover:scale-110 text-gray-600"
                onClick={() =>
                  followAndUpdateState(
                    user,
                    entryUser,
                    followedUsers,
                    setFollowedUsers
                  )
                }
              >
                <UserPlus size={16} />
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EntryLogged;
