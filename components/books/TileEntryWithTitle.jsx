import { ThumbsUp, ThumbsDown, Heart, ArrowUpRight } from "react-feather";
import slugify from "slugify";
import Link from "next/dist/client/link";
import TileEntry from "./TileEntry";

const TileEntryWithTitle = ({ data }) => {
  const slug = (title, id) =>
    slugify(`${title}-${id}`, { lower: true, strict: true });

  return (
    <div className="bg-white text-justify leading-6">
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
      <TileEntry data={data} />
    </div>
  );
};

export default TileEntryWithTitle;
