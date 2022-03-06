import Head from "next/head";
import WelcomeTop from "../../../components/users/WelcomeTop";
import SearchInput from "../../../components/navigation/SearchInput";
import NoAccess from "../../../components/users/NoAccess";

const BookSearch = ({ userState }) => {
  if (userState.isLogged) {
    return (
      <>
        <Head>
          <title>Create book tile</title>
        </Head>

        <WelcomeTop
          bcgImg="bg-create-tile"
          text="What book have you just read?"
        />
        <div className="2xl:w-4/5 mx-auto">
          <div className="w-4/5 mx-auto md:w-4/6 lg:w-3/6 xl:w-4/5 xl:flex xl:mt-20 xl:justify-around xl:mb-20">
            <div className="mt-20 xl:mt-0 xl:w-2/4">
              <SearchInput
                pageDest="/users/book-search/"
                placeholder="Enter book title"
                searchMode="books"
                suggestLink="/users/book-tiles/create/"
                showSuggest={true}
                showHistory={true}
              />
            </div>

            <div className="mt-60 mb-20 xl:mb-0 xl:mt-0 border-l-2 pl-5 xl:w-2/5">
              <div className="text-lg">
                "Books are the treasured wealth of the world and the fit
                inheritance of generations and nations."
              </div>
              <div className="text mt-5 pr-10 text-gray-600 italic text-right">
                Henry David Thoreau, Walden
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <NoAccess />;
};

export default BookSearch;
