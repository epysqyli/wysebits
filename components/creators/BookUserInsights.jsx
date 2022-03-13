import TileEntry from "../books/TileEntry";

const BookUserInsights = ({
  bookInsights,
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
  return (
    <div className="absolute w-4/5 bg-gray-50 rounded-md shadow-md">
      {bookInsights.map((bookInsight) => (
        <TileEntry
          entryProp={bookInsight}
          user={user}
          insights={insights}
          setInsights={setInsights}
          upvotedEntries={upvotedEntries}
          setUpvotedEntries={setUpvotedEntries}
          downvotedEntries={downvotedEntries}
          setDownvotedEntries={setDownvotedEntries}
          followedUsers={followedUsers}
          setFollowedUsers={setFollowedUsers}
        />
      ))}
    </div>
  );
};

export default BookUserInsights;
