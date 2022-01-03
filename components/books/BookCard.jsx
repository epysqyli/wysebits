import Image from "next/dist/client/image";
import { shortenText } from "../../lib/utils";

const BookCard = ({ bookData }) => {
  const olSrc = `https://covers.openlibrary.org/w/olid/${bookData.ol_key}-M.jpg`;
  const dbSrc = bookData.cover_url;

  return (
    <div className="flex justify-center gap-x-8 px-1 py-4">
      <div className="w-2/6">
        <div className="shadow-md rounded-md">
          <Image
            src={dbSrc || olSrc || ""}
            className="animate-show-up-slow rounded-md"
            layout="responsive"
            width="40"
            height="60"
            objectFit="cover"
            placeholder="blur"
            blurDataURL="/images/book-placeholder.png"
          />
        </div>
      </div>

      <div className="w-3/6 flex flex-col justify-around text-right">
        <div className="text-xl font-medium">{bookData.title}</div>
        <div className="text">{bookData.category.name}</div>
        <div className="text italic">
          {bookData.authors[0]
            ? bookData.authors[0].full_name
            : "No authors found"}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
