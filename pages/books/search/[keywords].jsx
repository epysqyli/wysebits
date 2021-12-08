import axios from "axios";
import { PlusCircle } from "react-feather";
import Link from "next/link";
import BookSearchTile from "../../../components/books/BookSearchTile";
import { useState, useEffect } from "react";
import slugify from "slugify";

export const getServerSideProps = async (context) => {
  const keywords = context.query.keywords.split("-").join(" ");

  const searchResults = await axios({
    method: "post",
    data: { keywords: JSON.stringify(keywords) },
    url: "http://localhost:3001/api/search/books",
  });

  return {
    props: {
      searchResults: searchResults.data.results,
      currentFrom: searchResults.data.current_from,
    },
  };
};

const BookSearchResults = ({ searchResults }) => {
  const [btnVisible, setBtnVisible] = useState(false);

  const showBtn = () => {
    setBtnVisible(true);
  };

  const createBookBtn = (
    <Link href="/users/book-tiles/create/create-book">
      <div className="cursor-pointer py-4 text-center transition border-t-4 border-gray-50 bg-gray-100 hover:bg-gray-300 active:bg-gray-400 fixed bottom-0 left-0 w-screen animate-show-up z-10">
        <div className="flex justify-center items-center gap-x-4">
          <div className="text-sm font-medium">
            No results? Add your book now!
          </div>
          <PlusCircle strokeWidth={1.5} />
        </div>
      </div>
    </Link>
  );

  const slug = (title, id) =>
    slugify(`${title}-${id}`, { lower: true, strict: true });

  useEffect(() => {
    setTimeout(showBtn, 2000);
  }, []);

  return (
    <div>
      <Link href="/">
        <div className="py-3 text-center text-sm font-medium bg-gray-100 cursor-pointer hover:shadow-md hover:bg-gray-100 active:bg-gray-200">
          Back to homepage
        </div>
      </Link>
      <div className="w-4/5 mx-auto">
        {searchResults.length != 0
          ? searchResults.map((book) => {
              return (
                <BookSearchTile
                  bookData={book}
                  destPage={`/books/${slug(
                    book._source.title,
                    book._source.id
                  )}/1`}
                  key={book._id}
                />
              );
            })
          : null}

        {btnVisible ? createBookBtn : null}
      </div>
    </div>
  );
};

export default BookSearchResults;
