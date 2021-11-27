import { ThumbsUp, ThumbsDown, Heart } from "react-feather";

const TileEntry = ({ data }) => {
  return (
    <div className="mx-auto bg-white text-justify leading-6 shadow rounded hover:shadow-md transition-shadow">
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

          <div className="flex items-center">
            <div>
              <Heart size={16} />
            </div>
          </div>
        </div>

        <div>{data.book_tile.user.username}</div>
      </div>
    </div>
  );
};

export default TileEntry;
