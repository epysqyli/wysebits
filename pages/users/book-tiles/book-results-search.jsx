import Head from "next/head";
import axios from "axios";
import { Search, PlusCircle } from "react-feather";
import { useState } from "react";
import BookResult from "../../../components/BookResult";
import Link from "next/link";

const BookResultsSearch = () => {
  const [searchTerms, setSearchTerms] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [btnVisible, setBtnVisible] = useState(false);

  const handleChange = (e) => {
    const newSearchTerms = e.target.value;
    setSearchTerms(newSearchTerms);
  };

  const showBtn = () => {
    setBtnVisible(true);
  };

  const searchBooks = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3001/api/search/books",
        { keywords: JSON.stringify(searchTerms) },
        { withCredentials: true }
      )
      .then((resp) => {
        setSearchResults(resp.data);
      })
      .catch((error) => console.log(error));

    setTimeout(showBtn, 2000);
  };

  const createBookBtn = (
    <Link href="/users/book-tiles/create-book">
      <div className="cursor-pointer py-4 text-center transition border-t-4 border-gray-50 bg-gray-100 hover:bg-gray-300 active:bg-gray-400 fixed bottom-0 left-0 w-screen animate-show-up">
        <div className="flex justify-center items-center gap-x-4">
          <div className="text-sm font-medium">Book not there? Create it now!</div>
          <PlusCircle />
        </div>
      </div>
    </Link>
  );

  return (
    <div>
      <Head>
        <title>Create book tile</title>
      </Head>

      <div className="w-4/5 mx-auto my-20 pb-10">
        <div className="text-2xl font-medium text-center">
          What book did you just read?
        </div>

        <form onSubmit={searchBooks} className="flex my-10 group">
          <input
            type="text"
            name="tmp"
            id="tmp"
            className="border-none bg-white w-5/6 rounded-tl-lg rounded-bl-lg focus:ring-0 group-hover:shadow-md transition"
            onChange={handleChange}
            placeholder="search by title"
            required
          />

          <button
            type="submit"
            className="w-1/6 text-center bg-white border-l rounded-tr-lg rounded-br-lg hover:bg-gray-200 group-hover:shadow-md transition active:bg-gray-400 active:text-white"
          >
            <Search size={20} className="mx-auto" />
          </button>
        </form>

        {searchResults.length != 0
          ? searchResults.map((book) => {
              return <BookResult bookData={book} key={book._id} />;
            })
          : null}

        {btnVisible ? createBookBtn : null}
      </div>
    </div>
  );
};

export default BookResultsSearch;
