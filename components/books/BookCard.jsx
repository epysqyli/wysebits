import { useState } from "react";
import Image from "next/dist/client/image";
import { shortenText } from "../../lib/utils";
import { Image as ImageLoader, ArrowUpRight } from "react-feather";
import Link from "next/dist/client/link";

const BookCard = ({ bookData, showLink }) => {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const olSrc = `https://covers.openlibrary.org/w/olid/${bookData.ol_key}-M.jpg`;
  const dbSrc = bookData.cover_url;

  return (
    <div className="flex justify-center gap-x-8 px-1 py-4">
      <div className="w-2/6 relative">
        {imageIsLoaded == false ? (
          <ImageLoader
            size={40}
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

      <div className="w-3/6 flex flex-col justify-around text-right">
        <div className="text-xl font-medium break-words">
          {shortenText(bookData.title, 8)}
        </div>

        {showLink ? (
          <div className="cursor-pointer hover:text-gray-200 active:text-gray-300 flex justify-end items-center gap-x-2 group">
            <Link href={`/categories/${bookData.category.slug}/1`}>
              {bookData.category.name}
            </Link>
            <ArrowUpRight size={18} className="group-hover:scale-125 transition-transform" />
          </div>
        ) : (
          <div>{bookData.category.name}</div>
        )}

        <div className="italic">
          {bookData.authors[0]
            ? bookData.authors[0].full_name
            : "No authors found"}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
