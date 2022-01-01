import { ThumbsUp, ThumbsDown, ArrowUpRight } from "react-feather";
import Link from "next/dist/client/link";

const EntryGuest = ({ data }) => {
  return (
    <div className="shadow-md rounded-md">
      <div className="border-b-2 py-5 px-10 md:px-16 whitespace-pre-line font-light">
        {data.content}
      </div>

      <div className="flex justify-between items-center text-sm px-10 md:px-16 py-4">
        <div className="flex justify-center items-center gap-x-3">
          <ThumbsUp size={16} color="gray" strokeWidth={1.75} />
          <div className="text-gray-600">{data.net_votes}</div>
          <ThumbsDown size={16} color="gray" strokeWidth={1.75} />
        </div>

        <Link href={`/creators/${data.book_tile.user.username}`}>
          <div className="group flex items-center gap-x-1 transition-all">
            <div className="text-gray-600 active:text-gray-200 cursor-pointer">
              {data.book_tile.user.username}
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
