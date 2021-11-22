import { Image as ImageIcon } from "react-feather";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

const BookResult = ({ bookData }) => {
  const [cover, setCover] = useState(false);

  const imageLoader = (
    <div>
      <ImageIcon className="animate-bounce" />
    </div>
  );

  const olSrc = `https://covers.openlibrary.org/w/olid/${bookData._source.ol_key}-M.jpg`;
  const dbSrc = bookData._source.cover_url;

  const coverImage = (
    <img
      className="w-1/3 rounded-md bg-gray-300 object-cover"
      src={dbSrc || olSrc || ""}
    />
  );

  useEffect(() => {
    axios
      .get(
        `https://covers.openlibrary.org/w/olid/${bookData._source.ol_key}-M.jpg`
      )
      .then((resp) => {
        setCover(true);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Link href={`/users/book-tiles/create/${bookData._source.id}`}>
      <div className="border bg-gray-100 rounded-md shadow-sm my-10 px-5 py-5 cursor-pointer hover:shadow-md transition hover:bg-gray-200 animate-show-up-slow">
        <div className="flex justify-between">
          <div className="w-2/3 mr-5 flex flex-col">
            <div
              className="text-xl mb-2"
              dangerouslySetInnerHTML={{ __html: bookData.highlight.title }}
            ></div>

            <div className="text-sm">
              {bookData._source.category.name == "CATCHALL"
                ? "No category"
                : bookData._source.category.name}
            </div>

            <div className="text-sm italic">
              {bookData._source.authors.length
                ? bookData._source.authors[0].full_name
                : "No authors found"}
            </div>
          </div>

          {!cover ? imageLoader : coverImage}
        </div>
      </div>
    </Link>
  );
};

export default BookResult;
