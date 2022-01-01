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
  addFollowedUserToState,
  removeFollowedUserFromState,
} from "../../../lib/tileEntryMethods";
import { isFollowed } from "../../../lib/followMethods";

const EntryLogged = ({
  data,
  userId,
  insights,
  setInsights,
  upvotedEntries,
  setUpvotedEntries,
  downvotedEntries,
  setDownvotedEntries,
  followedUsers,
  setFollowedUsers,
}) => {
  const entryUser = data.book_tile.user;

  // methods related to like/heart functionalities
  const isFavInsight = () => {
    return insights.some((insight) => insight.id === data.id);
  };

  const addToFavInsights = () => {
    axios
      .post(
        `http://localhost:3001/api/users/${userId}/fav_tile_entries/${data.id}`,
        {},
        { withCredentials: true }
      )
      .then((res) => addInsightToState(data, insights, setInsights))
      .catch((err) => console.log(err));
  };

  const removeFromFavInsights = () => {
    axios
      .delete(
        `http://localhost:3001/api/users/${userId}/fav_tile_entries/${data.id}`,
        { withCredentials: true }
      )
      .then((res) => removeInsightFromState(data, insights, setInsights))
      .catch((err) => console.log(err));
  };

  // methods related to upvote and downvote functionalities
  const isUpvoted = () => {
    return upvotedEntries.some((entry) => entry.id == data.id);
  };

  const isDownvoted = () => {
    return downvotedEntries.some((entry) => entry.id == data.id);
  };

  const addToUpvoted = () => {
    axios
      .post(
        `http://localhost:3001/api/users/${userId}/tile_entries/${data.id}/upvote`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        if (isDownvoted()) {
          removeFromDownvoted();
        }
        addUpEntryToState(data, upvotedEntries, setUpvotedEntries);
      })
      .catch((err) => console.log(err));
  };

  const removeFromUpvoted = () => {
    axios
      .post(
        `http://localhost:3001/api/users/${userId}/tile_entries/${data.id}/remove_upvote`,
        {},
        { withCredentials: true }
      )
      .then((res) =>
        removeUpEntryFromState(data, upvotedEntries, setUpvotedEntries)
      )
      .catch((err) => console.log(err));
  };

  const addToDownvoted = () => {
    axios
      .post(
        `http://localhost:3001/api/users/${userId}/tile_entries/${data.id}/downvote`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        if (isUpvoted()) {
          removeFromUpvoted();
        }
        addDownEntryToState(data, downvotedEntries, setDownvotedEntries);
      })
      .catch((err) => console.log(err));
  };

  const removeFromDownvoted = () => {
    axios
      .post(
        `http://localhost:3001/api/users/${userId}/tile_entries/${data.id}/remove_downvote`,
        {},
        { withCredentials: true }
      )
      .then((res) =>
        removeDownEntryFromState(data, downvotedEntries, setDownvotedEntries)
      )
      .catch((err) => console.log(err));
  };

  const follow = () => {
    axios
      .post(
        `http://localhost:3001/api/users/${userId}/follow/${entryUser.id}`,
        {},
        { withCredentials: true }
      )
      .then((res) =>
        addFollowedUserToState(entryUser, followedUsers, setFollowedUsers)
      )
      .catch((err) => console.log(err));
  };

  const unfollow = () => {
    axios
      .post(
        `http://localhost:3001/api/users/${userId}/unfollow/${entryUser.id}`,
        {},
        { withCredentials: true }
      )
      .then((res) =>
        removeFollowedUserFromState(entryUser, followedUsers, setFollowedUsers)
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="shadow-md rounded-md">
      <div className="border-b-2 py-5 px-10 md:px-16 font-light whitespace-pre-line">
        {data.content}
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

          <div className="text-gray-600">{data.upvotes - data.downvotes}</div>

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
          <Link href={`/creators/${data.book_tile.user.username}`}>
            <div className="flex items-center gap-x-1">
              <div className="text-gray-600 active:text-gray-200 cursor-pointer">
                {data.book_tile.user.username}
              </div>
              <ArrowUpRight
                size={18}
                className="text-gray-600 group-hover:scale-110"
              />
            </div>
          </Link>
          {isFollowed(followedUsers, entryUser) ? (
            <div
              className="cursor-pointer hover:scale-110 text-gray-600"
              onClick={() => unfollow()}
            >
              <UserMinus size={16} />
            </div>
          ) : (
            <div
              className="cursor-pointer hover:scale-110 text-gray-600"
              onClick={() => follow()}
            >
              <UserPlus size={16} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntryLogged;
