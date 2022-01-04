import EntryGuest from "./EntryGuest";
import slugify from "slugify";
import Link from "next/dist/client/link";
import { ArrowUpRight } from "react-feather";

const EntryGuestTitle = ({ entryProp }) => {
  const slug = (title, id) =>
    slugify(`${title}-${id}`, { lower: true, strict: true });

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
      <EntryGuest entryProp={entryProp} />
    </div>
  );
};

export default EntryGuestTitle;
