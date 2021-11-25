import BookCard from "./BookCard";

const BookTitleBackground = ({ bookData }) => {
  const bcgImage = () => {
    const olSrc = `https://covers.openlibrary.org/w/olid/${bookData.ol_key}-M.jpg`;
    const dbSrc = bookData.cover_url;
    return dbSrc === null ? olSrc : dbSrc;
  };

  return (
    <div className="relative py-5">
      <img
        src={bcgImage()}
        className="absolute top-0 left-1/2 -translate-x-1/2 blur-sm backdrop-brightness-50 grayscale-50 contrast-50 max-h-full w-full object-cover"
      />

      <div className="w-4/5 mx-auto shadow-md backdrop-blur-md backdrop-brightness-75 text-white rounded-md relative z-10">
        <BookCard bookData={bookData} />
      </div>
    </div>
  );
};

export default BookTitleBackground;
