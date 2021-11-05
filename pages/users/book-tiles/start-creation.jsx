import Head from "next/head";
import axios from "axios";
import { useState } from "react";
import BookResult from "../../../components/BookResult";

const Create = () => {
  const [searchTerms, setSearchTerms] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showBtn, setShowBtn] = useState(false);

  const handleChange = (e) => {
    const newSearchTerms = e.target.value;
    setSearchTerms(newSearchTerms);
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

    setShowBtn(true);
  };

  const createBookBtn = (
    <div className="cursor-pointer py-5 text-center transition bg-gray-100 hover:bg-gray-300 active:bg-gray-400 fixed bottom-0 left-0 w-screen">
      <div className="text-sm font-medium uppercase">Book not there? Create it!</div>
    </div>
  );

  return (
    <div>
      <Head>
        <title>Create book tile</title>
      </Head>

      <div className="w-4/5 mx-auto my-20 pb-10">
        <div className="text-lg font-medium text-center">
          What book did you just read?
        </div>

        <form onSubmit={searchBooks} className="flex bg-white my-10 rounded-sm shadow-sm group">
          <input
            type="text"
            name="tmp"
            id="tmp"
            className="border-none w-4/6 focus:ring-0 group-hover:shadow-md transition"
            onChange={handleChange}
            placeholder="search by title"
            required
          />

          <button
            type="submit"
            className="w-2/6 text-center border-l hover:bg-gray-200 group-hover:shadow-md transition active:bg-gray-400 active:text-white"
          >
            Go!
          </button>
        </form>

        {searchResults.length != 0
          ? searchResults.map((book) => {
              return <BookResult bookData={book} key={book._id} />;
            })
          : null}

        {showBtn ? createBookBtn : null}
      </div>
    </div>
  );
};

export default Create;
