import slugify from "slugify";
import Link from "next/link";
import BookCard from "../../../../components/books/BookCard";
import WelcomeTop from "../../../../components/users/WelcomeTop";
import NoAccess from "../../../../components/users/NoAccess";
import NoItem from "../../../../components/users/NoItem";
import SearchInput from "../../../../components/navigation/SearchInput";
import PageNavButton from "../../../../components/navigation/PageNavButton";
import { getLoggedUser, getFavBooks } from "../../../../lib/serverSideMethods";

export const getServerSideProps = async (context) => {
  try {
    const pageNum = context.query.page;

    const loggedUser = await getLoggedUser(context);

    const booksResp = await getFavBooks(loggedUser, context, pageNum);

    return {
      props: {
        books: booksResp.data.books,
        pagy: booksResp.data.pagy,
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

const FavoriteBooks = ({ books, pagy, userState }) => {
  const clientUrl = "/users/actions/favorite-books";

  const slug = (title, id) =>
    slugify(`${title}-${id}`, { lower: true, strict: true });

  if (userState.isLogged && books.length == 0)
    return (
      <div className="pb-20 bg-gradient-to-br from-blue-50 via-gray-100 to-gray-200">
        <WelcomeTop text="Your favorite books" bcgImg="bg-liked-books" />
        <div className="mx-auto w-4/5 md:w-4/6 lg:w-3/6 xl:w-2/6 2xl:w-1/3 py-20 lg:py-40 2xl:py-48">
          <NoItem message="You have no favorite books yet" />
          <div className="border px-5 pt-3 md:px-8 md:pt-5 mt-20 lg:mt-32 bg-gray-50 rounded-md shadow group transition-all hover:shadow-md text-center">
            <div>
              You can add books to your favorite ones simply by hitting the
              heart on a book of choice.
              <br />
              <br />{" "}
              <div className="text-center mt-5">Start exploring books now!</div>
            </div>
            <div className="mt-10 mb-3">
              <SearchInput
                pageDest="/books/search/"
                placeholder="Any book in mind?"
                searchMode="books"
              />
            </div>
          </div>
        </div>
      </div>
    );

  if (userState.isLogged && books.length !== 0)
    return (
      <div className="pb-20 bg-gradient-to-br from-blue-50 via-gray-100 to-gray-200">
        <WelcomeTop text="Your favorite books" bcgImg="bg-liked-books" />
        <div className="py-10 w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
          {books.map((item) => {
            return (
              <Link
                href={`/books/${slug(item.book.title, item.book.id)}/1`}
                key={item.book.id}
              >
                <div className="rounded-md bg-gray-50 transition-colors animate-show-up cursor-pointer active:shadow-inner border-2 border-gray-300 hover:border-gray-400">
                  <BookCard bookData={item.book} />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex justify-around py-16 md:w-4/5 lg:w-1/2 mx-auto">
          <div className="w-1/3">
            <PageNavButton
              direction="left"
              clientUrl={clientUrl}
              url={pagy.prev_url}
            />
          </div>
          <div className="w-1/3">
            <PageNavButton
              direction="right"
              clientUrl={clientUrl}
              url={pagy.next_url}
            />
          </div>
        </div>
      </div>
    );

  return <NoAccess />;
};

export default FavoriteBooks;
