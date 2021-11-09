const BookCard = ({ bookData, tileEntries }) => {
  const olSrc = `https://covers.openlibrary.org/w/olid/${bookData.ol_key}-M.jpg`;
  const dbSrc = bookData.cover_url;

  const coverImage = (
    <img
      className="w-2/6 rounded-md bg-gray-200 object-cover"
      src={dbSrc || olSrc || ""}
    />
  );

  return (
    <div className="flex justify-between p-2 border bg-gray-100 rounded-md shadow-md">
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
  );
};

export default BookCard;
