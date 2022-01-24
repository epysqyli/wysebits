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
    <div className="py-4 md:py-0 md:my-4 bg-white md:w-4/5 mx-auto lg:flex xl:w-4/6 2xl:w-1/2 animate-show-up-slow md:shadow">
      <div className="w-4/5 md:w-3/5 mx-auto lg:w-1/3 lg:bg-gray-100">
        <BookCard
          bookData={entry.book_tile.book}
          showCategoryLink={true}
          showBookLink={true}
          showAuthorLink={true}
          feed={true}
        />
      </div>
      <div className="lg:w-2/3">
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
          feed={true}
        />
      </div>
    </div>
  );
};

export default FeedEntry;
