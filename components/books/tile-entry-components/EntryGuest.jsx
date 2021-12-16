import { ThumbsUp, ThumbsDown, ArrowUpRight } from "react-feather";
import Link from "next/dist/client/link";

const EntryGuest = ({ data }) => {
  return (
    <div className="shadow-md rounded-md">
      <div className="border-b-2 py-3 px-2">{data.content}</div>

      <div className="flex justify-between items-center text-sm px-2 py-2">
        <div className="flex justify-center gap-x-6">
          <div className="flex items-center gap-x-1 py-2">
            <div className="text-gray-600">{data.upvotes}</div>
            <div className="pb-1">
              <ThumbsUp size={16} />
            </div>
          </div>

          <div className="flex items-center gap-x-1">
            <div className="text-gray-600">{data.downvotes}</div>
            <div>
              <ThumbsDown size={16} />
            </div>
          </div>
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
