import { ThumbsUp, ThumbsDown, Heart, ArrowUpRight } from "react-feather";
import slugify from "slugify";
import Link from "next/dist/client/link";
import axios from "axios";

const TileEntry = ({ data, showTitle, userId, favInsights }) => {
  const isFavInsight = () => {
    return favInsights.some((insight) => insight.id === data.id);
  };

  const entryBase = (
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

          <div className="flex items-center">
            {isFavInsight() ? (
              <div onClick={() => removeFromFavInsights()}>
                <Heart size={16} fill="lightgray" />
              </div>
            ) : (
              <div onClick={() => addToFavInsights()}>
                <Heart size={16} />
              </div>
            )}
          </div>
        </div>

        <div>{data.book_tile.user.username}</div>
      </div>
    </div>
  );

  const addToFavInsights = () => {
    axios
      .post(
        `http://localhost:3001/api/users/${userId}/fav_tile_entries/${data.id}`,
        {},
        { withCredentials: true }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const removeFromFavInsights = () => {
    axios
      .delete(
        `http://localhost:3001/api/users/${userId}/fav_tile_entries/${data.id}`,
        { withCredentials: true }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  if (!showTitle) {
    return (
      <div className="bg-white text-justify leading-6 shadow rounded-md hover:shadow-md transition-all">
        {entryBase}
      </div>
    );
  } else {
    const slug = (title, id) =>
      slugify(`${title}-${id}`, { lower: true, strict: true });

    return (
      <div className="bg-white text-justify leading-6 shadow rounded-md hover:shadow-md transition-all">
        <Link
          href={`/books/${slug(
            data.book_tile.book.title,
            data.book_tile.book.id
          )}/1`}
        >
          <div className="px-2 py-2 flex justify-center items-center gap-x-5 hover:scale-105 active:text-black transition-transform cursor-pointer">
            <div className="text-sm text-gray-600">
              {data.book_tile.book.title}
            </div>
            <ArrowUpRight size={18} className="text-gray-600" />
          </div>
        </Link>
        {entryBase}
      </div>
    );
  }
};

export default TileEntry;
