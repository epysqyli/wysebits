import { useState } from "react";
import Slider from "./Slider";
import Button from "./Button";
import Link from "next/dist/client/link";

const BookCardTiles = ({ bookData, tileEntries }) => {
  const olSrc = `https://covers.openlibrary.org/w/olid/${bookData.ol_key}-M.jpg`;
  const dbSrc = bookData.cover_url;

  const coverImage = (
    <img
      className="w-2/6 rounded-md bg-gray-300 object-cover"
      src={dbSrc || olSrc || ""}
    />
  );

  const [showEntries, setShowEntries] = useState(false);

  const clickable = "cursor-pointer hover:bg-gray-200 hover:shadow-md";

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
      onClick={() => (!tileEntries ? null : toggleEntries(showEntries))}
      className={`border bg-gray-100 rounded-md shadow-md transition-all ${
        tileEntries ? clickable : null
      }`}
    >
      <div className="flex justify-between p-2">
        {coverImage}

        <div className="w-3/6">
          <div className="text-xl mb-5 font-medium">{bookData.title}</div>
          <div className="text-sm">{bookData.category.name}</div>
          <div className="text-sm italic">
            {bookData.authors[0]
              ? bookData.authors[0].full_name
              : "No authors found"}
          </div>
        </div>
      </div>

      {showEntries ? entries : null}

      <div className="w-4/5 mx-auto my-3">
        <Link href="#">
          <a>
            <Button text="Edit book tiles" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default BookCardTiles;
