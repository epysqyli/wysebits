import {
  UserPlus,
  UserMinus,
  ThumbsUp,
  ThumbsDown,
  Heart,
  MessageCircle,
  X,
} from "react-feather";

import {
  isUpvoted,
  isDownvoted,
  upvoteAndUpdateState,
  downvoteAndUpdateState,
  removeUpvoteAndUpdateState,
  removeDownvoteAndUpdateState,
  addToFavInsightsAndUpdateState,
  removeFromFavInsightsAndUpdateState,
  isFavInsight,
} from "../../../lib/tileEntryMethods";

import {
  isFollowed,
  followAndUpdateState,
  unfollowAndUpdateState,
} from "../../../lib/followMethods";

import { loadComments } from "../../../lib/commentsMethods";

import CreatorLink from "../../navigation/CreatorLink";

const EntryActions = ({
  user,
  entryProp,
  upvotedEntries,
  downvotedEntries,
  setUpvotedEntries,
  setDownvotedEntries,
  followedUsers,
  setFollowedUsers,
  insights,
  setInsights,
  commentsView,
  setComments,
  showInsight,
  showComments,
  feed,
}) => {
  const entryUser = entryProp.book_tile.user;

  const feedStyle =
    "flex justify-between items-center text-sm px-10 md:px-16 py-4 lg:bg-gray-100 border-b-2 lg:border-none";

  const basicStyle =
    "flex justify-between items-center text-sm px-10 md:px-16 py-4";

  return (
    <div className={feed ? feedStyle : basicStyle}>
      <div className="flex justify-center items-center gap-x-3">
        {isUpvoted(upvotedEntries, entryProp) ? (
          <div
            onClick={() =>
              removeUpvoteAndUpdateState(
                user,
                entryProp,
                upvotedEntries,
                setUpvotedEntries
              )
            }
          >
            <ThumbsUp
              size={16}
              fill="darkgray"
              color="darkgray"
              className="transition-all hover:scale-105 active:scale-125 cursor-pointer"
            />
          </div>
        ) : (
          <div
            onClick={() =>
              upvoteAndUpdateState(
                user,
                entryProp,
                upvotedEntries,
                downvotedEntries,
                setUpvotedEntries,
                setDownvotedEntries
              )
            }
          >
            <ThumbsUp
              size={16}
              color="darkgray"
              className="transition-all hover:scale-105 active:scale-125 cursor-pointer"
            />
          </div>
        )}

        <div className="text-gray-600">
          {entryProp.upvotes - entryProp.downvotes}
        </div>

        {isDownvoted(downvotedEntries, entryProp) ? (
          <div
            onClick={() =>
              removeDownvoteAndUpdateState(
                user,
                entryProp,
                downvotedEntries,
                setDownvotedEntries
              )
            }
          >
            <ThumbsDown
              size={16}
              fill="darkgray"
              color="darkgray"
              className="transition-all hover:scale-105 active:scale-125 cursor-pointer"
            />
          </div>
        ) : (
          <div
            onClick={() =>
              downvoteAndUpdateState(
                user,
                entryProp,
                upvotedEntries,
                downvotedEntries,
                setUpvotedEntries,
                setDownvotedEntries
              )
            }
          >
            <ThumbsDown
              size={16}
              color="darkgray"
              className="transition-all hover:scale-105 active:scale-125 cursor-pointer"
            />
          </div>
        )}
      </div>

      <div className="flex justify-around items-center w-1/4">
        <div>
          {isFavInsight(entryProp, insights) ? (
            <div
              onClick={() =>
                removeFromFavInsightsAndUpdateState(
                  user,
                  entryProp,
                  insights,
                  setInsights
                )
              }
            >
              <Heart
                size={16}
                fill="gray"
                color="darkgray"
                className="transition-all hover:scale-105 active:scale-125 cursor-pointer"
              />
            </div>
          ) : (
            <div
              onClick={() =>
                addToFavInsightsAndUpdateState(
                  user,
                  entryProp,
                  insights,
                  setInsights
                )
              }
            >
              <Heart
                size={16}
                color="darkgray"
                className="transition-all hover:scale-105 active:scale-125 cursor-pointer"
              />
            </div>
          )}
        </div>

        <div className="flex items-center">
          {commentsView ? (
            <X
              size={16}
              strokeWidth={1.5}
              className="ml-1 text-gray-700 transition-all hover:scale-105 active:scale-125 cursor-pointer"
              onClick={showInsight}
            />
          ) : (
            <MessageCircle
              size={16}
              strokeWidth={1.5}
              className="ml-1 text-gray-700 transition-all hover:scale-105 active:scale-125 cursor-pointer"
              onClick={() =>
                loadComments(entryProp.id, setComments, showComments)
              }
            />
          )}
        </div>
      </div>

      <div className="group flex items-center gap-x-2 transition-all">
        <CreatorLink username={entryProp.book_tile.user.username} />

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
  );
};

export default EntryActions;
