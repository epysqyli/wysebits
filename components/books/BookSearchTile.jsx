import Image from "next/dist/client/image";
import Link from "next/link";
import { Image as ImageLoader } from "react-feather";
import { useState } from "react";

const BookSearchTile = ({ bookData, destPage }) => {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const olSrc = `https://covers.openlibrary.org/w/olid/${bookData.ol_key}-M.jpg`;
  const dbSrc = bookData.cover_url;

  return (
    <Link href={destPage}>
      <div className="py-3 px-4 rounded-md bg-white shadow-lg hover:bg-gradient-to-b hover:from-white hover:to-gray-50 hover:shadow-xl transition-all cursor-pointer active:shadow-inner border-b-2 border-blue-200 hover:border-blue-300">
        <div className="flex justify-between">
          <div className="w-2/3 mr-5 flex flex-col justify-between">
            {bookData.pg_search_highlight ? (
              <div
                className="text-lg font-medium mb-2 tracking-tight"
                dangerouslySetInnerHTML={{
                  __html: bookData.pg_search_highlight,
                }}
              ></div>
            ) : (
              <div className="text-lg font-medium mb-2 tracking-tight">
                {bookData.title}
              </div>
            )}

            <div className="text-gray-600">
              {bookData.category.name == "CATCHALL"
                ? "No category"
                : bookData.category.name}
            </div>

            <div className="text italic text-gray-600">
              {bookData.authors.length
                ? bookData.authors[0].full_name
                : "No authors found"}
            </div>
          </div>

          <div className="w-2/6 relative">
            {imageIsLoaded == false ? (
              <ImageLoader
                size={30}
                strokeWidth={1.5}
                color="gray"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"
              />
            ) : null}
            <div className="shadow-md rounded-md bg-gray-200">
              <Image
                src={dbSrc || olSrc || ""}
                className="animate-show-up-slow rounded-md"
                layout="responsive"
                width="40"
                height="60"
                objectFit="cover"
                onLoad={() => setImageIsLoaded(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookSearchTile;
