import Head from "next/head";
import axios from "axios";
import { useState } from "react";
import BookResult from "../../../components/BookResult";

const Create = () => {
  const [searchTerms, setSearchTerms] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

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
  };

  return (
    <div>
      <Head>
        <title>Create book tile</title>
      </Head>

      <div className="w-4/5 mx-auto my-20">
        <form onSubmit={searchBooks} className="w-full mx-auto py-10">
          <label htmlFor="tmp" className="pl-1 text-lg font-medium">
            What book did you just read?
          </label>

          <input
            type="text"
            name="tmp"
            id="tmp"
            className="block mt-5 py-3 w-full border-none focus:ring-0 rounded-lg shadow-sm focus:shadow-md transition-shadow text-center"
            onChange={handleChange}
            placeholder="search by title"
            required
          />

          <button
            type="submit"
            className="block mx-auto w-4/6 border rounded-lg px-5 py-2 bg-white my-10 hover:shadow-md focus:bg-gray-200 focus:shadow-md"
          >
            Search book
          </button>
        </form>

        {searchResults.length != 0 ? searchResults.map((book) => {
          return <BookResult bookData={book} key={book._id} />;
        }) : null}
      </div>
    </div>
  );
};

export default Create;
