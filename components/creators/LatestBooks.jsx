import { useState } from "react";
import BookCard from "../books/BookCard";
import BookUserInsights from "./BookUserInsights";
import { getBookUserInsights } from "../../lib/creatorMethods";

const LatestBooks = ({
  userId,
  books,
  userState,
  insights,
  setInsights,
  upvotedEntries,
  setUpvotedEntries,
  downvotedEntries,
  setDownvotedEntries,
  followedUsers,
  setFollowedUsers,
  addOverlay,
  removeOverlay,
}) => {
  const [latest] = useState(books.slice(0, 4));
  const [bookInsights, setBookInsights] = useState([]);
  const [currentBookId, setCurrentBookId] = useState(null);

  const showBookInsights = async (bookId) => {
    addOverlay();
    const resp = await getBookUserInsights(userId, bookId);
    setBookInsights(resp.data);
    setCurrentBookId(bookId);
  };

  const closeBookInsight = () => {
    removeOverlay();
    setCurrentBookId(null);
  };

  return (
    <>
      <div className="text-center text-gray-100 font-medium text-5xl">
        Latest books
      </div>
      <div className="py-10 w-11/12 lg:w-4/5 xl:w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
        {latest.map((book) => {
          return (
            <div key={book.id}>
              <div onClick={() => showBookInsights(book.id)}>
                <div className="rounded-md bg-white shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all cursor-pointer active:shadow-inner border-b-2 border-blue-200 hover:border-blue-300">
                  <BookCard bookData={book} />
                </div>
              </div>
            </div>
          );
        })}

        <BookUserInsights
          closeInsight={closeBookInsight}
          bookInsights={bookInsights}
          user={userState}
          insights={insights}
          setInsights={setInsights}
          upvotedEntries={upvotedEntries}
          setUpvotedEntries={setUpvotedEntries}
          downvotedEntries={downvotedEntries}
          setDownvotedEntries={setDownvotedEntries}
          followedUsers={followedUsers}
          setFollowedUsers={setFollowedUsers}
          addOverlay={addOverlay}
          removeOverlay={removeOverlay}
          currentBookId={currentBookId}
        />

        {currentBookId && (
          <BookUserInsights
            closeInsight={closeBookInsight}
            bookInsights={bookInsights}
            user={userState}
            insights={insights}
            setInsights={setInsights}
            upvotedEntries={upvotedEntries}
            setUpvotedEntries={setUpvotedEntries}
            downvotedEntries={downvotedEntries}
            setDownvotedEntries={setDownvotedEntries}
            followedUsers={followedUsers}
            setFollowedUsers={setFollowedUsers}
            addOverlay={addOverlay}
            removeOverlay={removeOverlay}
            currentBookId={currentBookId}
          />
        )}
      </div>
    </>
  );
};

export default LatestBooks;
