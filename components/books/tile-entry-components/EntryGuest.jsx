import { ThumbsUp, ThumbsDown } from "react-feather";
import Link from "next/dist/client/link";

const EntryGuest = ({ data }) => {
  return (
    <div className="shadow-md rounded-md">
      <div className="border-b-2 py-3 px-2">{data.content}</div>

      <div className="flex justify-between items-center text-sm px-2 py-2">
        <div className="flex justify-center gap-x-6">
          <div className="flex items-center gap-x-1 py-2">
            <div>{data.upvotes}</div>
            <div className="pb-1">
              <ThumbsUp size={16} />
            </div>
          </div>

          <div className="flex items-center gap-x-1">
            <div>{data.downvotes}</div>
            <div>
              <ThumbsDown size={16} />
            </div>
          </div>
        </div>

        <Link href={`/creators/${data.book_tile.user.username}`}>
          <div>{data.book_tile.user.username}</div>
        </Link>
      </div>
    </div>
  );
};

export default EntryGuest;
