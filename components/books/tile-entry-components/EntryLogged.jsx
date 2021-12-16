import { ThumbsUp, ThumbsDown, Heart, ArrowUpRight } from "react-feather";
import axios from "axios";
import Link from "next/dist/client/link";

const EntryLogged = ({
  data,
  insights,
  addInsightToState,
  removeInsightFromState,
  userId,
  upvotedEntries,
  downvotedEntries,
  removeUpEntryFromState,
  addUpEntryToState,
  removeDownEntryFromState,
  addDownEntryToState,
}) => {
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
      .then((res) => addInsightToState(data))
      .catch((err) => console.log(err));
  };

  const removeFromFavInsights = () => {
    axios
      .delete(
        `http://localhost:3001/api/users/${userId}/fav_tile_entries/${data.id}`,
        { withCredentials: true }
      )
      .then((res) => removeInsightFromState(data))
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
        addUpEntryToState(data);
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
      .then((res) => removeUpEntryFromState(data))
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
        addDownEntryToState(data);
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
      .then((res) => removeDownEntryFromState(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="shadow-md rounded-md">
      <div className="border-b-2 py-3 px-2">{data.content}</div>

      <div className="flex justify-between items-center text-sm px-2 py-2">
        <div className="flex justify-center gap-x-6">
          {isUpvoted() ? (
            <div className="flex items-center gap-x-1 py-2">
              <div>{data.upvotes}</div>
              <div className="pb-1" onClick={() => removeFromUpvoted()}>
                <ThumbsUp size={16} fill="darkgray" color="darkgray" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-x-1 py-2">
              <div>{data.upvotes}</div>
              <div className="pb-1" onClick={() => addToUpvoted()}>
                <ThumbsUp size={16} color="darkgray" />
              </div>
            </div>
          )}

          {isDownvoted() ? (
            <div className="flex items-center gap-x-1">
              <div>{data.downvotes}</div>
              <div onClick={() => removeFromDownvoted()}>
                <ThumbsDown size={16} fill="darkgray" color="darkgray" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-x-1">
              <div>{data.downvotes}</div>
              <div onClick={() => addToDownvoted()}>
                <ThumbsDown size={16} color="darkgray" />
              </div>
            </div>
          )}

          <div className="flex items-center">
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

        <Link href={`/creators/${data.book_tile.user.username}`}>
          <div className="group flex items-center gap-x-1 transition-all">
            <div className="active:text-gray-200 cursor-pointer">
              {data.book_tile.user.username}
            </div>
            <ArrowUpRight size={18} className="text-gray-600 group-hover:scale-110" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EntryLogged;
