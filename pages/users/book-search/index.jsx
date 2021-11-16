import Head from "next/head";
import { Search, PlusCircle } from "react-feather";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

const BookSearch = () => {
  const [searchTerms, setSearchTerms] = useState(null);

  const [btnVisible, setBtnVisible] = useState(false);

  const router = useRouter();

  const searchBooks = () => {
    // console.log(getQuery());
    router.push({
      pathname: `/users/book-search/${getQuery()}`,
    });
  };

  const handleChange = (e) => {
    const newSearchTerms = e.target.value;
    setSearchTerms(newSearchTerms);
  };

  const showBtn = () => {
    setBtnVisible(true);
  };

  const getQuery = () => {
    return searchTerms.split(" ").join("-");
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

  return (
    <div>
      <Head>
        <title>Create book tile</title>
      </Head>

      <div className="mt-20 text-2xl font-medium text-center border-b-2 pb-3 shadow-md">
        What book did you just read?
      </div>

      <div className="w-4/5 mx-auto my-20 pb-10">
        <div className="flex my-10 group rounded-lg shadow-md">
          <input
            type="text"
            name="tmp"
            id="tmp"
            minLength="3"
            className="border-none bg-white w-5/6 rounded-tl-lg rounded-bl-lg focus:ring-0 group-hover:shadow-md transition"
            onChange={handleChange}
            placeholder="search by title"
            required
          />

          <button
            type="submit"
            className="w-1/6 text-center bg-white border-l rounded-tr-lg rounded-br-lg hover:bg-gray-200 group-hover:shadow-md transition active:bg-gray-400 active:text-white"
          >
            <Search size={20} className="mx-auto" onClick={searchBooks} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
