import { ThumbsUp, ThumbsDown } from "react-feather";

const HomeTileEntry = ({ entry }) => {
  return (
    <div className="w-3/5">
      <div className="text-xl">{entry.book_tile.book.title}</div>
      <p className="mt-5 text-justify">{entry.content}</p>
      <div className="flex justify-between items-center mt-5 pt-2 border-t">
        <div>
          <p className="text-sm">Posted by: {entry.book_tile.user.name}</p>
          <p className="text-sm">
            Category: {entry.book_tile.book.category.name}
          </p>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <ThumbsUp size={14} />
            <span className="ml-3 text-sm">{entry.upvotes}</span>
          </div>
          <div className="flex justify-between items-center">
            <ThumbsDown size={14} />
            <span className="ml-3 text-sm">{entry.downvotes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTileEntry;
