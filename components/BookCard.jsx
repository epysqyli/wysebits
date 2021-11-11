import { useState } from "react";

const BookCard = ({ bookData, tileEntries }) => {
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
      {!tileEntries ? null : null}
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
    </div>
  );
};

export default BookCard;
