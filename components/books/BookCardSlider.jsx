import Slider from "./Slider";
import BookCard from "./BookCard";
import Link from "next/dist/client/link";

const BookCardSlider = ({ bookData, tileEntries, bookTileId }) => {
  return (
    <div className="border pt-2 bg-gray-100 rounded-md shadow-md cursor-pointer hover:shadow-md">
      <BookCard bookData={bookData} />

      <div className="mt-5 text-justify">
        {!tileEntries ? null : <Slider entries={tileEntries} />}
      </div>

      <div className="mx-auto">
        <Link href={`/users/book-tiles/edit/${bookTileId}`}>
          <a className="block text-center text-sm border-t-2 border-gray-200 rounded-br-md rounded-bl-md bg-gray-100 hover:bg-gray-300 active:text-white py-2">
            Edit your contributions
          </a>
        </Link>
      </div>
    </div>
  );
};

export default BookCardSlider;