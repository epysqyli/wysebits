import EntryLogged from "./EntryLogged";
import Link from "next/dist/client/link";
import { ArrowUpRight } from "react-feather";
import { slug } from "../../../lib/utils";

const EntryLoggedTitle = ({
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
}) => {
  return (
    <div className="bg-white text-justify leading-6 shadow rounded-md hover:shadow-md transition-all">
      <Link
        href={`/books/${slug(
          entryProp.book_tile.book.title,
          entryProp.book_tile.book.id
        )}/1`}
      >
        <div className="px-2 pt-4 flex justify-center items-center gap-x-5 hover:scale-105 active:text-black transition-transform cursor-pointer">
          <div className="text-sm text-gray-600">
            {entryProp.book_tile.book.title}
          </div>
          <ArrowUpRight size={18} className="text-gray-600" />
        </div>
      </Link>
      <EntryLogged
        entryProp={entryProp}
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
    </div>
  );
};

export default EntryLoggedTitle;
