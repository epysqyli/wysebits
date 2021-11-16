import axios from "axios";
import { PlusCircle } from "react-feather";
import Link from "next/link";
import BookResult from "../../../components/BookResult";
import { useState, useEffect } from "react";

export const getServerSideProps = async (context) => {
  const keywords = context.query.keywords.split("-").join(" ");

  const searchResults = await axios({
    method: "post",
    data: { keywords: JSON.stringify(keywords) },
    url: "http://localhost:3001/api/search/books",
    headers: { cookie: context.req.headers.cookie },
  });

  return {
    props: {
      searchResults: searchResults.data,
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
      <div className="cursor-pointer py-4 text-center transition border-t-4 border-gray-50 bg-gray-100 hover:bg-gray-300 active:bg-gray-400 fixed bottom-0 left-0 w-screen animate-show-up">
        <div className="flex justify-center items-center gap-x-4">
          <div className="text-sm font-medium">
            No results? Add your book now!
          </div>
          <PlusCircle strokeWidth={1.5} />
        </div>
      </div>
    </Link>
  );

  useEffect(() => {
    setTimeout(showBtn, 2000);
  }, []);

  return (
    <div className="w-4/5 mx-auto my-16">
      {searchResults.length != 0
        ? searchResults.map((book) => {
            return <BookResult bookData={book} key={book._id} />;
          })
        : null}

      {btnVisible ? createBookBtn : null}
    </div>
  );
};

export default BookSearchResults;
