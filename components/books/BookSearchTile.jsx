import Image from "next/dist/client/image";
import Link from "next/link";

const BookSearchTile = ({ bookData, destPage }) => {
  const olSrc = `https://covers.openlibrary.org/w/olid/${bookData._source.ol_key}-M.jpg`;
  const dbSrc = bookData._source.cover_url;

  return (
    <Link href={destPage}>
      <div className="p-5 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 animate-show-up cursor-pointer active:bg-gray-300">
        <div className="flex justify-between">
          <div className="w-2/3 mr-5 flex flex-col justify-around">
            <div
              className="text-xl mb-2"
              dangerouslySetInnerHTML={{ __html: bookData.highlight.title }}
            ></div>

            <div className="text">
              {bookData._source.category.name == "CATCHALL"
                ? "No category"
                : bookData._source.category.name}
            </div>

            <div className="text italic">
              {bookData._source.authors.length
                ? bookData._source.authors[0].full_name
                : "No authors found"}
            </div>
          </div>

          <div className="w-2/6">
            <div className="shadow-md rounded-md">
              <Image
                src={dbSrc || olSrc || ""}
                className="animate-show-up-slow rounded-md"
                layout="responsive"
                width="10"
                height="15"
                objectFit="cover"
                placeholder="blur"
                blurDataURL="/images/book-placeholder.png"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookSearchTile;
