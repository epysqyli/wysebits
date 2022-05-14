import { useState } from "react";
import { XCircle } from "react-feather";
import TileEntry from "../books/TileEntry";
import Link from "next/dist/client/link";
import { slug } from "../../lib/utils";
import { motion } from "framer-motion";
import useMediaQuery from "../../hooks/UseMediaQuery";

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
  addOverlay,
  removeOverlay,
}) => {
  const isNarrow = useMediaQuery("(max-width: 768px)");

  return (
    <motion.div className="z-30 absolute w-full lg:w-5/6 xl:w-3/5 2xl:w-1/2 h-full lg:h-1/3 bg-white pt-20 pb-10 lg:py-5 px-2 lg:rounded-md lg:shadow overflow-auto">
      <div className="overflow-y-auto max-h-full w-full">
        <div className="flex justify-around items-center mx-auto w-5/6 py-4 mb-5 border-b border-gray-400">
          <h1 className="text-xl w-3/5 underline">
            <Link
              href={`/books/${slug(
                bookInsights[0].book_tile.book.title,
                bookInsights[0].book_tile.book.id
              )}?page=1`}
            >
              {bookInsights[0].book_tile.book.title}
            </Link>
          </h1>
          <XCircle
            className="text-gray-600 cursor-pointer hover:scale-95 active:scale-90"
            size={36}
            strokeWidth={1.5}
            onClick={closeInsight}
          />
        </div>
        {bookInsights.map((bookInsight) => (
          <TileEntry
            key={bookInsight.id}
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
            addOverlay={addOverlay}
            removeOverlay={removeOverlay}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default BookUserInsights;
