import { ThumbsUp, ThumbsDown, Heart, ArrowUpRight } from "react-feather";
import slugify from "slugify";
import Link from "next/dist/client/link";
import TileEntry from "./TileEntry";

const TileEntryWithTitle = ({ data }) => {
  const slug = (title, id) =>
    slugify(`${title}-${id}`, { lower: true, strict: true });

  return (
    <div className="bg-white text-justify leading-6 shadow rounded-md hover:shadow-md transition-all">
      <Link
        href={`/books/${slug(
          data.book_tile.book.title,
          data.book_tile.book.id
        )}`}
      >
        <div className="px-2 py-2 flex justify-center items-center gap-x-5 hover:scale-105 active:text-black transition-transform cursor-pointer">
          <div className="text-sm text-gray-600">
            {data.book_tile.book.title}
          </div>
          <ArrowUpRight size={18} className="text-gray-600" />
        </div>
      </Link>
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

export default TileEntryWithTitle;