import { useState } from "react";
import Slider from "./Slider";
import Button from "./Button";
import BookCard from "./BookCard";
import Link from "next/dist/client/link";

const BookCardTiles = ({ bookData, tileEntries, bookTileId }) => {
  const [showEntries, setShowEntries] = useState(false);

  const entries = (
    <div className="mt-10 text-justify animate-show-up-slow">
      {!tileEntries ? null : <Slider entries={tileEntries} />}
    </div>
  );

  const toggleEntries = (entriesState) => {
    entriesState ? setShowEntries(false) : setShowEntries(true);
  };

  return (
    <div
      onClick={() => toggleEntries(showEntries)}
      className="border bg-gray-100 rounded-md shadow-md cursor-pointer hover:bg-gray-200 hover:shadow-md"
    >
      <BookCard bookData={bookData} />

      {showEntries ? entries : null}

      <div className="mx-auto">
        <Link
          href={{
            pathname: "/users/book-tiles/edit/[id]",
            query: { id: bookTileId },
          }}
        >
          <a className="block text-center rounded-br-md rounded-bl-md bg-gray-200 hover:bg-gray-300 active:text-white py-2">
            edit book tile
          </a>
        </Link>
      </div>
    </div>
  );
};

export default BookCardTiles;
