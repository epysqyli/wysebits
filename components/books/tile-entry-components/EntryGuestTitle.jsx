import EntryGuest from "./EntryGuest";
import Link from "next/dist/client/link";
import { ArrowUpRight } from "react-feather";
import { slug, shortenText } from "../../../lib/utils";

const EntryGuestTitle = ({ entryProp }) => {
  return (
    <div className="flex flex-col justify-around h-full">
      <div className="bg-white text-justify leading-6 rounded-md hover:shadow-md transition-all">
        <Link
          href={`/books/${slug(
            entryProp.book_tile.book.title,
            entryProp.book_tile.book.id
          )}/1`}
        >
          <div className="px-2 pt-4 flex justify-center items-center gap-x-5 hover:scale-105 active:text-black transition-transform cursor-pointer">
            <div className="text-sm text-gray-600">
              {shortenText(entryProp.book_tile.book.title, 5)}
            </div>
            <ArrowUpRight size={18} className="text-gray-600" />
          </div>
        </Link>
      </div>
      <div className="flex-grow">
        <EntryGuest entryProp={entryProp} />
      </div>
    </div>
  );
};

export default EntryGuestTitle;
