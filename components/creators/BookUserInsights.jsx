import { XCircle } from "react-feather";
import TileEntry from "../books/TileEntry";

const BookUserInsights = ({
  closeInsight,
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
    <div className="z-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full lg:w-5/6 xl:w-4/5 2xl:w-1/2 h-full lg:h-2/3 bg-gray-100 pt-20 pb-10 lg:py-5 px-2 lg:rounded-md lg:shadow-sm overflow-auto">
      <div className="overflow-y-auto max-h-full w-full">
        <div className="flex justify-around items-center mx-auto w-5/6 pb-5 border-b-2">
          <h1 className="text-xl w-3/5">
            {bookInsights[0].book_tile.book.title}
          </h1>
          <XCircle
            className="w-1/5 text-gray-500 hover:text-gray-600 cursor-pointer hover:scale-95 active:scale-90"
            size={36}
            strokeWidth={1.5}
            onClick={closeInsight}
          />
        </div>
        {bookInsights.map((bookInsight) => (
          <TileEntry
            entryProp={bookInsight}
            user={user.user}
            isLogged={user.isLogged}
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
    </div>
  );
};

export default BookUserInsights;
