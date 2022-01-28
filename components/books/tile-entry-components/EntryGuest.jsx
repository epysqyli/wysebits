import { ThumbsUp, ThumbsDown, ArrowUpRight } from "react-feather";
import Link from "next/dist/client/link";

const EntryGuest = ({ entryProp, feed }) => {
  if (feed === true)
    return (
      <div className="flex flex-col justify-around h-full">
        <div className="border-b-2 lg:border-l-2 rounded-bl py-5 px-10 md:px-16 whitespace-pre-line font-light flex-grow mt-10 mx-auto text-justify md:text-left lg:mt-0 lg:w-full">
          {entryProp.content}
        </div>

        <div className="flex justify-between items-center text-sm px-10 md:px-16 py-4 lg:bg-gray-100">
          <div className="flex justify-center items-center gap-x-3">
            <ThumbsUp size={16} color="gray" strokeWidth={1.75} />
            <div className="text-gray-600">{entryProp.net_votes}</div>
            <ThumbsDown size={16} color="gray" strokeWidth={1.75} />
          </div>

          <Link href={`/creators/${entryProp.book_tile.user.username}`}>
            <div className="group flex items-center gap-x-1 transition-all">
              <div className="text-gray-600 active:text-gray-200 cursor-pointer">
                {entryProp.book_tile.user.username}
              </div>
              <ArrowUpRight
                size={18}
                className="text-gray-600 group-hover:scale-110"
              />
            </div>
          </Link>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col justify-around h-full">
      <div className="border-b-2 py-5 px-10 md:px-16 font-light whitespace-pre-line flex-grow">
        {entryProp.content}
      </div>

      <div className="flex justify-between items-center text-sm px-10 md:px-16 py-4">
        <div className="flex justify-center items-center gap-x-3">
          <ThumbsUp size={16} color="gray" strokeWidth={1.75} />
          <div className="text-gray-600">{entryProp.net_votes}</div>
          <ThumbsDown size={16} color="gray" strokeWidth={1.75} />
        </div>

        <Link href={`/creators/${entryProp.book_tile.user.username}`}>
          <div className="group flex items-center gap-x-1 transition-all">
            <div className="text-gray-600 active:text-gray-200 cursor-pointer">
              {entryProp.book_tile.user.username}
            </div>
            <ArrowUpRight
              size={18}
              className="text-gray-600 group-hover:scale-110"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EntryGuest;
