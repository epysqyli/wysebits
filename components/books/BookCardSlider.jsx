import Slider from "./Slider";
import BookCard from "./BookCard";
import Link from "next/dist/client/link";

const BookCardSlider = ({ bookData, tileEntries, bookTileId }) => {
  return (
    <div className="border pt-2 bg-gray-50 rounded-md shadow-md cursor-pointer hover:shadow-md">
      <BookCard bookData={bookData} />

      <div className="mt-5 text-justify">
        {!tileEntries ? null : <Slider entries={tileEntries} />}
      </div>

      <div className="mx-auto">
        <Link href={`/users/book-tiles/edit/${bookTileId}`}>
          <a className="block text-center text-sm rounded-br-md rounded-bl-md bg-gray-50 hover:bg-gray-200 active:shadow-inner py-2">
            Edit your contributions
          </a>
        </Link>
      </div>
    </div>
  );
};

export default BookCardSlider;
