import slugify from "slugify";
import Link from "next/link";
import BookCard from "../../../../components/books/BookCard";
import WelcomeTop from "../../../../components/users/WelcomeTop";
import NoAccess from "../../../../components/users/NoAccess";
import NoItem from "../../../../components/users/NoItem";
import MultiSearch from "../../../../components/navigation/MultiSearch";
import Pagination from "../../../../components/navigation/Pagination";
import { getLoggedUser, getFavBooks } from "../../../../lib/serverSideMethods";
import SpecificSearch from "../../../../components/search/SpecificSearch";
import { searchWithinFavBooks } from "../../../../lib/searchMethods";
import NoResults from "../../../../components/search/NoResults";

export const getServerSideProps = async (context) => {
  try {
    const pageNum = context.query.page;
    const loggedUser = await getLoggedUser(context);

    let books;
    if (context.query.searchTerms === undefined) {
      books = await getFavBooks(loggedUser, context, pageNum);
    } else {
      const keywords = context.query.searchTerms;
      books = await searchWithinFavBooks(
        loggedUser.data.user.id,
        keywords,
        pageNum
      );
    }

    return {
      props: {
        books: books.data.results,
        pagy: books.data.pagy,
        currentSearchTerms: context.query.searchTerms ?? null,
        searchParams: context.query.searchTerms
          ? { searchTerms: context.query.searchTerms }
          : null,
      },
    };
  } catch (error) {
    return {
      props: {
        books: null,
      },
    };
  }
};

const FavoriteBooks = ({
  books,
  pagy,
  userState,
  currentSearchTerms,
  searchParams,
}) => {
  const clientUrl = "/users/actions/favorite-books";

  const slug = (title, id) =>
    slugify(`${title}-${id}`, { lower: true, strict: true });

  if (userState.isLogged && books.length === 0 && currentSearchTerms !== null)
    return (
      <div className="pt-10 lg:pt-16">
        <WelcomeTop text="Your favorite books" bcgImg="bg-liked-books" />
        <div className="mt-5">
          <SpecificSearch
            placeholder="search favorite books"
            baseUrl="/users/actions/favorite-books"
            currentSearchTerms={currentSearchTerms}
          />
        </div>
        <NoResults />
      </div>
    );

  if (userState.isLogged && books.length === 0)
    return (
      <div className="pt-10 lg:pt-16">
        <WelcomeTop text="Your favorite books" bcgImg="bg-liked-books" />
        <div className="mx-auto w-4/5 md:w-4/6 lg:w-3/6 xl:w-2/6 2xl:w-1/3 py-20 lg:py-40 2xl:py-48">
          <NoItem message="You have no favorite books yet" />
          <div className="border px-5 pt-3 md:px-8 md:pt-5 mt-20 lg:mt-32 bg-gray-100 rounded-md shadow group transition-all hover:shadow-md text-center">
            <div>
              You can add books to your favorite ones simply by hitting the
              heart on a book of choice.
              <br />
              <br />{" "}
              <div className="text-center mt-5">Start exploring books now!</div>
            </div>
            <div className="my-10">
              <MultiSearch />
            </div>
          </div>
        </div>
      </div>
    );

  if (userState.isLogged && books.length !== 0)
    return (
      <div className="pt-10 lg:pt-16">
        <WelcomeTop text="Your favorite books" bcgImg="bg-liked-books" />
        <div className="mt-5">
          <SpecificSearch
            placeholder="search favorite books"
            baseUrl="/users/actions/favorite-books"
            currentSearchTerms={currentSearchTerms}
          />
        </div>
        <div className="py-16 w-11/12 lg:w-4/5 xl:w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
          {books.map((item) => {
            return (
              <Link
                href={`/books/${slug(item.book.title, item.book.id)}?page=1`}
                key={item.book.id}
              >
                <div className="rounded-md bg-white shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all cursor-pointer active:shadow-inner border-b-2 border-blue-200 hover:border-blue-300">
                  <BookCard bookData={item.book} />
                </div>
              </Link>
            );
          })}
        </div>

        <Pagination clientUrl={clientUrl} pagy={pagy} opts={searchParams} />
      </div>
    );

  return <NoAccess />;
};

export default FavoriteBooks;
