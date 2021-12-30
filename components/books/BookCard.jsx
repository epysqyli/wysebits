import Image from "next/dist/client/image";

const BookCard = ({ bookData }) => {
  const olSrc = `https://covers.openlibrary.org/w/olid/${bookData.ol_key}-M.jpg`;
  const dbSrc = bookData.cover_url;

  return (
    <div className="flex justify-center gap-x-5 px-1 py-5">
      <Image
        className="w-2/6 rounded-md bg-gray-300 object-cover animate-show-up-slow shadow-lg"
        src={dbSrc || olSrc || ""}
        width="130"
        height="200"
        layout="intrinsic"
        placeholder="blur"
        placeholder="blur"
        blurDataURL="/images/book-placeholder.jpg"
      />

      <div className="w-3/6">
        <div className="text-xl text-center mb-5 font-medium">
          {bookData.title}
        </div>
        <div className="text-sm text-center">{bookData.category.name}</div>
        <div className="text-sm text-center italic my-5">
          {bookData.authors[0]
            ? bookData.authors[0].full_name
            : "No authors found"}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
