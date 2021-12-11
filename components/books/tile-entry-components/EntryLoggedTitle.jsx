import EntryLogged from "./EntryLogged";
import slugify from "slugify";
import Link from "next/dist/client/link";
import { ArrowUpRight } from "react-feather";

const EntryLoggedTitle = ({
  data,
  insights,
  addInsightToState,
  removeInsightFromState,
  userId,
  upvotedEntries,
  downvotedEntries,
  removeUpEntryFromState,
  addUpEntryToState,
  removeDownEntryFromState,
  addDownEntryToState,
}) => {
  const slug = (title, id) =>
    slugify(`${title}-${id}`, { lower: true, strict: true });

  return (
    <div className="bg-white text-justify leading-6 shadow rounded-md hover:shadow-md transition-all">
      <Link
        href={`/books/${slug(
          data.book_tile.book.title,
          data.book_tile.book.id
        )}/1`}
      >
        <div className="px-2 py-2 flex justify-center items-center gap-x-5 hover:scale-105 active:text-black transition-transform cursor-pointer">
          <div className="text-sm text-gray-600">
            {data.book_tile.book.title}
          </div>
          <ArrowUpRight size={18} className="text-gray-600" />
        </div>
      </Link>
      <EntryLogged
        data={data}
        insights={insights}
        addInsightToState={addInsightToState}
        removeInsightFromState={removeInsightFromState}
        userId={userId}
        upvotedEntries={upvotedEntries}
        downvotedEntries={downvotedEntries}
        removeUpEntryFromState={removeUpEntryFromState}
        addUpEntryToState={addUpEntryToState}
        removeDownEntryFromState={removeDownEntryFromState}
        addDownEntryToState={addDownEntryToState}
      />
    </div>
  );
};

export default EntryLoggedTitle;
