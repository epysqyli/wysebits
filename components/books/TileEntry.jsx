import { ThumbsUp, ThumbsDown } from "react-feather";

const TileEntry = ({ data }) => {
  return (
    <div className="w-4/5 mx-auto text-justify leading-7">
      <div className="border-b-2 pb-2">{data.content}</div>

      <div className="flex justify-between items-center text-sm px-1">
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

        <div>{data.book_tile.user.username}</div>
      </div>
    </div>
  );
};

export default TileEntry;
