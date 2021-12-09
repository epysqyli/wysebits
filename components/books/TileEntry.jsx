import { ThumbsUp, ThumbsDown, ArrowUpRight } from "react-feather";
import slugify from "slugify";
import Link from "next/dist/client/link";
import EntryLogged from "./tile-entry-components/EntryLogged";
import EntryGuest from "./tile-entry-components/EntryGuest";
import EntryLoggedTitle from "./tile-entry-components/EntryLoggedTitle";

const TileEntry = ({
  data,
  showTitle,
  userId,
  insights,
  addInsightToState,
  removeInsightFromState,
  isLogged,
}) => {
  if (isLogged) {
    if (showTitle) {
      return (
        <EntryLoggedTitle
          data={data}
          insights={insights}
          addInsightToState={addInsightToState}
          removeInsightFromState={removeInsightFromState}
          userId={userId}
        />
      );
    } else {
      return (
        <div className="bg-white text-justify leading-6 shadow rounded-md hover:shadow-md transition-all">
          <EntryLogged
            data={data}
            insights={insights}
            addInsightToState={addInsightToState}
            removeInsightFromState={removeInsightFromState}
            userId={userId}
          />
        </div>
      );
    }
  } else {
    if (!showTitle) {
      return (
        <div className="bg-white text-justify leading-6 shadow rounded-md hover:shadow-md transition-all">
          <EntryGuest data={data} />
        </div>
      );
    } else {
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
          {/* {entryBase} */}
        </div>
      );
    }
  }
};

export default TileEntry;
