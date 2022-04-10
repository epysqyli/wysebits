import BookCardSlider from "../../../components/books/BookCardSlider";
import WelcomeTop from "../../../components/users/WelcomeTop";
import NoAccess from "../../../components/users/NoAccess";
import NoItem from "../../../components/users/NoItem";
import SearchInput from "../../../components/navigation/SearchInput";
import Pagination from "../../../components/navigation/Pagination";
import { getLoggedUser, getBookTiles } from "../../../lib/serverSideMethods";
import { searchWithinBookTiles } from "../../../lib/searchMethods";
import SpecificSearch from "../../../components/search/SpecificSearch";
import NoResults from "../../../components/search/NoResults";

export const getServerSideProps = async (context) => {
  try {
    const pageNum = context.query.page;

    const loggedUser = await getLoggedUser(context);

    let bookTiles;
    if (context.query.searchTerms === undefined) {
      bookTiles = await getBookTiles(loggedUser, pageNum);
    } else {
      const keywords = context.query.searchTerms;
      bookTiles = await searchWithinBookTiles(
        loggedUser.data.user.id,
        keywords,
        pageNum
      );
    }

    return {
      props: {
        bookTiles: bookTiles.data.tiles,
        pagy: bookTiles.data.pagy,
        currentSearchTerms: context.query.searchTerms ?? null,
        searchParams: context.query.searchTerms
          ? { searchTerms: context.query.searchTerms }
          : null,
      },
    };
  } catch (error) {
    return {
      props: { msg: error.message },
    };
  }
};

const UserBookTiles = ({
  bookTiles,
  pagy,
  userState,
  currentSearchTerms,
  searchParams,
}) => {
  const clientUrl = "/users/book-tiles";

  if (userState.isLogged && bookTiles.length === 0 && currentSearchTerms)
    return (
      <div className="pt-10 lg:pt-16">
        <WelcomeTop
          text="Your contributions"
          bcgImg="bg-check-book-tiles"
        />

        <div className="mt-5">
          <SpecificSearch
            placeholder="search within books"
            baseUrl={`/users/book-tiles`}
            currentSearchTerms={currentSearchTerms}
          />
        </div>

        <NoResults />
      </div>
    );

  if (userState.isLogged && bookTiles.length === 0)
    return (
      <div className="pt-10 lg:pt-16">
        <WelcomeTop
          text="Your contributions"
          bcgImg="bg-check-book-tiles"
        />
        <div className="mx-auto w-4/5 md:w-4/6 lg:w-3/6 xl:w-2/6 2xl:w-1/3 py-20 lg:py-40 2xl:py-48">
          <NoItem message="You have no contributions yet" />
          <div className="border px-5 pt-3 md:px-8 md:pt-5 mt-20 lg:mt-32 bg-gray-100 rounded-md shadow group transition-all hover:shadow-md text-center">
            <div>
              Start contributing now by choosing the first book for which you
              want to add your own personal insights
            </div>
            <div className="mt-10 mb-3">
              <SearchInput
                pageDest="/users/book-search/"
                placeholder="Any book in mind?"
                searchMode="books"
              />
            </div>
          </div>
        </div>
      </div>
    );

  if (userState.isLogged && bookTiles.length !== 0)
    return (
      <div className="pt-10 lg:pt-16">
        <WelcomeTop
          text="Your contributions"
          bcgImg="bg-check-book-tiles"
        />

        <div className="mt-5">
          <SpecificSearch
            placeholder="search within books"
            baseUrl={`/users/book-tiles`}
            currentSearchTerms={currentSearchTerms}
          />
        </div>

        <div className="py-10 w-11/12 lg:w-4/5 xl:w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
          {bookTiles.map((bookTile) => {
            return (
              <div key={bookTile.book.id}>
                <BookCardSlider
                  bookData={bookTile.book}
                  tileEntries={bookTile.tile_entries}
                  bookTileId={bookTile.id}
                />
              </div>
            );
          })}
        </div>

        <Pagination clientUrl={clientUrl} pagy={pagy} opts={searchParams} />
      </div>
    );

  return <NoAccess />;
};

export default UserBookTiles;
