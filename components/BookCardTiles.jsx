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

      <div className="w-3/5 mx-auto my-3">
        <Link
          href={{
            pathname: "/users/book-tiles/edit/[id]",
            query: { id: bookTileId },
          }}
        >
          <a>
            <Button text="Edit book tile" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default BookCardTiles;
