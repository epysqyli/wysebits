import Head from "next/head";
import WelcomeTop from "../../../components/users/WelcomeTop";
import SearchInput from "../../../components/navigation/SearchInput";
import NoAccess from "../../../components/users/NoAccess";

const BookSearch = ({ userState }) => {
  if (userState.isLogged) {
    return (
      <div className="pb-20">
        <Head>
          <title>Create book tile</title>
        </Head>

        <WelcomeTop
          bcgImg="bg-create-tile"
          text="What book have you just read?"
        />

        <div className="w-4/5 mx-auto md:w-4/6 lg:w-3/6 xl:w-2/6">
          <div className="mt-20">
            <SearchInput
              pageDest="/users/book-search/"
              placeholder="Enter book title"
              showSuggest={true}
              suggestLink="/users/book-tiles/create/"
            />
          </div>

          <div className="mt-60 border-l-2 border-gray-400 pl-3">
            <div className="text-lg my-3">
              "Books are the treasured wealth of the world and the fit
              inheritance of generations and nations."
            </div>
            <div className="text text-gray-600 italic text-right">
              Henry David Thoreau, Walden
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <NoAccess />;
  }
};

export default BookSearch;
