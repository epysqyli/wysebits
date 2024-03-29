import Image from "next/dist/client/image";
import Link from "next/link";
import { Image as ImageLoader } from "react-feather";
import { useState } from "react";
import IElasticBookResult from "../../interfaces/elastic/IElasticBookResult";
import { capitalize } from "../../lib/utils";

interface Props {
  bookData: IElasticBookResult;
  destPage: any;
}

const BookSearchTile = ({ bookData, destPage }: Props) => {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const olSrc = `https://covers.openlibrary.org/w/olid/${bookData._source.ol_key}-M.jpg`;
  const dbSrc = bookData._source.cover_url;

  return (
    <Link href={destPage}>
      <div className='py-3 px-4 rounded-md bg-white shadow-lg hover:bg-gradient-to-b hover:from-white hover:to-gray-50 hover:shadow-xl transition-all cursor-pointer active:shadow-inner border-b-2 border-blue-200 hover:border-blue-300'>
        <div className='flex justify-between'>
          <div className='w-2/3 mr-5 flex flex-col justify-between'>
            {bookData.highlight ? (
              <div
                className='text-lg font-medium mb-2 tracking-tight'
                dangerouslySetInnerHTML={{
                  __html: bookData.highlight.title[0]
                }}
              ></div>
            ) : (
              <div className='text-lg font-medium mb-2 tracking-tight'>{bookData._source.title}</div>
            )}

            <div className='text-gray-600'>
              {bookData._source.category.slug == "CATCHALL"
                ? "No category"
                : capitalize(bookData._source.category.slug.split("-").join(" "))}
            </div>

            <div className='text italic text-gray-600'>
              {bookData._source.authors.length ? bookData._source.authors[0].full_name : "No authors found"}
            </div>
          </div>

          <div className='w-2/6 relative'>
            {imageIsLoaded == false ? (
              <ImageLoader
                size={30}
                strokeWidth={1.5}
                color='gray'
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse'
              />
            ) : null}
            <div className='shadow-md rounded-md bg-gray-200'>
              <Image
                src={dbSrc || olSrc || ""}
                className='animate-show-up-slow rounded-md'
                layout='responsive'
                width='40'
                height='60'
                objectFit='cover'
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
