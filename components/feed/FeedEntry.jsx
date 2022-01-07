import TileEntry from "../books/TileEntry";
import BookCard from "../books/BookCard";

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
    <div className="my-2 bg-white">
      <div className="w-4/5 mx-auto">
        <BookCard bookData={entry.book_tile.book} showCategoryLink={true} showBookLink={true} />
      </div>
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
