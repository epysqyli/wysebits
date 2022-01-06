import TileEntry from "../books/TileEntry";

const FeedEntry = ({
  userState,
  entry,
  insights,
  setInsights,
  upvotedEntries,
  setUpvotedEntries,
  downvotedEntries,
  setDownvotedEntries,
  followedUsers,
  setFollowedUsers,
}) => {
  return (
    <div>
      <TileEntry
        user={userState.user}
        isLogged={userState.isLogged}
        entryProp={entry}
        insights={insights}
        setInsights={setInsights}
        upvotedEntries={upvotedEntries}
        setUpvotedEntries={setUpvotedEntries}
        downvotedEntries={downvotedEntries}
        setDownvotedEntries={setDownvotedEntries}
        followedUsers={followedUsers}
        setFollowedUsers={setFollowedUsers}
      />
    </div>
  );
};

export default FeedEntry;
