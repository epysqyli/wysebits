import { ThumbsUp, ThumbsDown } from "react-feather";

const HomeTileEntry = ({ entry }) => {
  return (
    <div className="w-3/5">
      <p className="mt-5 text-justify">{entry.content}</p>
      <div className="mt-5 pt-5 border-t flex justify-around">
        <div className="flex justify-center items-center">
          <ThumbsUp size={14} />
          <span className="ml-3 text-sm">{entry.upvotes}</span>
        </div>
        <div className="flex justify-center items-center">
          <ThumbsDown size={14} />
          <span className="ml-3 text-sm">{entry.downvotes}</span>
        </div>
      </div>
    </div>
  );
};

export default HomeTileEntry;
