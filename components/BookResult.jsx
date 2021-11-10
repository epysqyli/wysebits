import { Image as ImageIcon } from "react-feather";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

const BookResult = ({ bookData }) => {
  const [cover, setCover] = useState(null);

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

  const makeSlug = (string) => string.split(" ").join("-").toLowerCase();

  useEffect(() => {
    axios
      .get(
        `https://covers.openlibrary.org/w/olid/${bookData._source.ol_key}-M.jpg`
      )
      .then((resp) => {
        setCover(resp.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Link
      href={{
        pathname: "/users/book-tiles/create/[id]",
        query: { id: bookData._source.id },
      }}
      as={makeSlug(bookData._source.title)}
    >
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
