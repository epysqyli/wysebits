import EntryGuest from "./EntryGuest";
import Link from "next/dist/client/link";
import { ArrowUpRight } from "react-feather";
import { slug, shortenText } from "../../../lib/utils";

const EntryGuestTitle = ({ entryProp, userId }) => {
  return (
    <div className='flex flex-col justify-around h-full bg-white rounded-md shadow hover:shadow-md transition-all'>
      <div className='text-justify leading-6'>
        <Link href={`/books/${slug(entryProp.book_tile.book.title, entryProp.book_tile.book.id)}?page=1`}>
          <div className='px-2 pt-4 flex justify-center items-center gap-x-5 transition-transform cursor-pointer group'>
            <div className='text-sm text-gray-600'>{shortenText(entryProp.book_tile.book.title, 5)}</div>
            <ArrowUpRight
              size={18}
              className='text-gray-600 group-hover:scale-125 active:text-black transition-transform'
            />
          </div>
        </Link>
      </div>
      <div className='flex-grow'>
        <EntryGuest
          entryProp={entryProp}
          userId={userId}
        />
      </div>
    </div>
  );
};

export default EntryGuestTitle;
