import { useState } from "react";
import BookCard from "../books/BookCard";
import Link from "next/dist/client/link";
import slugify from "slugify";
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
}) => {
  const [latest] = useState(books.slice(0, 4));
  const [showInsights, setShowInsights] = useState(false);
  const [bookInsights, setBookInsights] = useState([]);

  const showBookInsights = async (bookId) => {
    const resp = await getBookUserInsights(userId, bookId);
    setBookInsights(resp.data);
    showInsights === false ? setShowInsights(true) : setShowInsights(false);
  };

  const closeBookInsight = () => setShowInsights(false);

  return (
    <>
      <div className="text-center text-gray-100 font-medium text-5xl">Latest books</div>
      <div className="py-10 w-11/12 lg:w-4/5 xl:w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
        {latest.map((book) => {
          return (
            <div key={book.id}>
              <div onClick={() => showBookInsights(book.id)}>
                <div className="rounded-md bg-white shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all cursor-pointer active:shadow-inner border-b-2 border-blue-200 hover:border-blue-300">
                  <BookCard bookData={book} />
                </div>
              </div>
              {showInsights === true ? (
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
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LatestBooks;
