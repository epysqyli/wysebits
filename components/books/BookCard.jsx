import { useState } from "react";
import Image from "next/dist/client/image";
import { shortenText } from "../../lib/utils";
import { Image as ImageLoader, ArrowUpRight } from "react-feather";
import Link from "next/dist/client/link";
import { slug } from "../../lib/utils";

const BookCard = ({ bookData, showCategoryLink, showBookLink, feed }) => {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const olSrc = `https://covers.openlibrary.org/w/olid/${bookData.ol_key}-M.jpg`;
  const dbSrc = bookData.cover_url;

  if (feed === true)
  return (
    <div className="flex justify-center gap-x-8 px-1 py-4 lg:block">
      <div className="w-2/6 relative lg:w-2/3 lg:mb-10 lg:mx-auto">
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

      <div className="w-3/6 flex flex-col justify-around text-right lg:w-4/5 lg:text-center lg:mx-auto lg:gap-y-2">
        {showBookLink ? (
          <Link href={`/books/${slug(bookData.title, bookData.id)}/1`}>
            <div className="text-xl font-medium break-words cursor-pointer hover:text-gray-300 active:text-gray-400">
              {shortenText(bookData.title, 8)}
            </div>
          </Link>
        ) : (
          <div className="text-xl font-medium break-words">
            {shortenText(bookData.title, 8)}
          </div>
        )}

        {showCategoryLink ? (
          <Link href={`/categories/${bookData.category.slug}/1`}>
            <div className="flex items-center gap-x-2 mx-auto cursor-pointer hover:text-gray-300 active:text-gray-400 group">
              <div>{bookData.category.name}</div>
              <ArrowUpRight
                size={18}
                className="group-hover:scale-125 transition-transform"
              />
            </div>
          </Link>
        ) : (
          <div>{bookData.category.name}</div>
        )}

        <div className="italic text-center">
          {bookData.authors[0]
            ? bookData.authors[0].full_name
            : "No authors found"}
        </div>
      </div>
    </div>
  );

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
        {showBookLink ? (
          <Link href={`/books/${slug(bookData.title, bookData.id)}/1`}>
            <div className="text-xl font-medium break-words cursor-pointer hover:text-gray-300 active:text-gray-400">
              {shortenText(bookData.title, 8)}
            </div>
          </Link>
        ) : (
          <div className="text-xl font-medium break-words">
            {shortenText(bookData.title, 8)}
          </div>
        )}

        {showCategoryLink ? (
          <Link href={`/categories/${bookData.category.slug}/1`}>
            <div className="flex justify-end items-center gap-x-2 cursor-pointer hover:text-gray-300 active:text-gray-400 mr-0 mx-auto group">
              <div>{bookData.category.name}</div>
              <ArrowUpRight
                size={18}
                className="group-hover:scale-125 transition-transform"
              />
            </div>
          </Link>
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
