import axios from "axios";
import slugify from "slugify";
import Link from "next/link";
import BookCard from "../../../../components/books/BookCard";
import WelcomeTop from "../../../../components/users/WelcomeTop";
import NoAccess from "../../../../components/users/NoAccess";
import NoItem from "../../../../components/users/NoItem";
import SearchInput from "../../../../components/navigation/SearchInput";
import PageNavButton from "../../../../components/navigation/PageNavButton";

export const getServerSideProps = async (context) => {
  try {
    const userResp = await axios({
      method: "get",
      url: "http://localhost:3001/api/logged_in",
      headers: { cookie: context.req.headers.cookie },
    });

    const pageNum = context.query.page;

    const booksResp = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/fav_books?page=${pageNum}`,
      headers: { cookie: context.req.headers.cookie },
    });

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

  if (userState.isLogged) {
    if (books.length == 0) {
      return (
        <div>
          <WelcomeTop text="Your favorite books" bcgImg="bg-liked-books" />
          <div className="w-4/5 mx-auto">
            <NoItem message="You have no favorite books yet" />
            <div className="border px-5 py-3 bg-gray-100 rounded-md shadow group transition-all cursor-pointer hover:shadow-md">
              <div>
                You can add books to your favorite ones simply by hitting the
                heart on a book of choice.
                <br /> Start exploring books now
              </div>
              <div className="mt-10 mb-3">
                <SearchInput
                  pageDest="/books/search/"
                  placeholder="Any book in mind?"
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <WelcomeTop text="Your favorite books" bcgImg="bg-liked-books" />
          <div className="mt-10 w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
            {books.map((item) => {
              return (
                <Link
                  href={`/books/${slug(item.book.title, item.book.id)}/1`}
                  key={item.book.id}
                >
                  <div className="rounded-md shadow-md border bg-gray-100 hover:bg-gray-200 animate-show-up cursor-pointer active:shadow-inner">
                    <BookCard bookData={item.book} />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center my-16 w-4/5 mx-auto gap-x-4">
            <div className="w-1/2">
              <PageNavButton
                btnText="Previous page"
                clientUrl={clientUrl}
                url={pagy.prev_url}
              />
            </div>
            <div className="w-1/2">
              <PageNavButton
                btnText="Next page"
                clientUrl={clientUrl}
                url={pagy.next_url}
              />
            </div>
          </div>
        </div>
      );
    }
  } else {
    return <NoAccess />;
  }
};

export default FavoriteBooks;
