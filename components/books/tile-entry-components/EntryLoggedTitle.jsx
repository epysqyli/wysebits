import EntryLogged from "./EntryLogged";
import Link from "next/dist/client/link";
import { ArrowUpRight } from "react-feather";
import { slug, shortenText } from "../../../lib/utils";

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
    <div className="flex flex-col justify-around h-full">
      <div>
        <Link
          href={`/books/${slug(
            entryProp.book_tile.book.title,
            entryProp.book_tile.book.id
          )}/1`}
        >
          <div className="px-2 pt-4 flex justify-center items-center gap-x-5 active:text-black transition-transform cursor-pointer group">
            <div className="text-sm text-gray-600">
              {shortenText(entryProp.book_tile.book.title, 5)}
            </div>
            <ArrowUpRight
              size={18}
              className="text-gray-600 group-hover:scale-125 transition-transform"
            />
          </div>
        </Link>
      </div>

      <div className="flex-grow">
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
    </div>
  );
};

export default EntryLoggedTitle;
