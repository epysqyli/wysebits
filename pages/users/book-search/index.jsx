import Head from "next/head";
import WelcomeTop from "../../../components/users/WelcomeTop";
import SearchInput from "../../../components/navigation/SearchInput";

const BookSearch = () => {
  return (
    <div>
      <Head>
        <title>Create book tile</title>
      </Head>

      <WelcomeTop firstLine="What book have you just read?" />

      <div className="w-4/5 mx-auto">
        <div className="mt-20">
          <SearchInput pageDest="/users/book-search/" />
        </div>

        <div className="mt-60 border-l-2 border-gray-400 pl-3">
          <div className="text-lg my-3">
            "Books are the treasured wealth of the world and the fit inheritance
            of generations and nations."
          </div>
          <div className="text text-gray-600 italic text-right">
            Henry David Thoreau, Walden
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
