import {
  ThumbsUp,
  ThumbsDown,
  Heart,
  ArrowUpRight,
  UserMinus,
  UserPlus,
} from "react-feather";

import Link from "next/dist/client/link";

import {
  isUpvoted,
  isDownvoted,
  upvoteAndUpdateState,
  downvoteAndUpdateState,
  removeUpvoteAndUpdateState,
  removeDownvoteAndUpdateState,
  addToFavInsightAndUpdateState,
  removeFromFavInsightsAndUpdateState,
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
  feed,
}) => {
  const entryUser = entryProp.book_tile.user;

  const isFavInsight = () =>
    insights.some((insight) => insight.id === entryProp.id);

  if (feed === true)
    return (
      <div className="flex flex-col justify-around h-full">
        <div className="border-b-2 lg:border-l-2 rounded-bl py-5 px-10 md:px-16 font-light whitespace-pre-line flex-grow">
          {entryProp.content}
        </div>

        <div className="flex justify-between items-center text-sm px-10 md:px-16 py-4 bg-gray-100">
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

            <div className="ml-3 flex items-center">
              {isFavInsight() ? (
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
                    fill="darkgray"
                    color="darkgray"
                    className="transition-all hover:scale-105 active:scale-125 cursor-pointer"
                  />
                </div>
              ) : (
                <div
                  onClick={() =>
                    addToFavInsightAndUpdateState(
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

  return (
    <div className="flex flex-col justify-around h-full">
      <div className="border-b-2 py-5 px-10 md:px-16 font-light whitespace-pre-line flex-grow">
        {entryProp.content}
      </div>

      <div className="flex justify-between items-center text-sm px-10 md:px-16 py-4">
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

          <div className="ml-3 flex items-center">
            {isFavInsight() ? (
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
                  fill="darkgray"
                  color="darkgray"
                  className="transition-all hover:scale-105 active:scale-125 cursor-pointer"
                />
              </div>
            ) : (
              <div
                onClick={() =>
                  addToFavInsightAndUpdateState(
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
