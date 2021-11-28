import axios from "axios";
import slugify from "slugify";
import Link from "next/link";
import BookCard from "../../../components/books/BookCard";
import WelcomeTop from "../../../components/users/WelcomeTop";
import NoAccess from "../../../components/users/NoAccess";
import NoItem from "../../../components/users/NoItem";
import SearchInput from "../../../components/navigation/SearchInput";

export const getServerSideProps = async (context) => {
  try {
    const userResp = await axios({
      method: "get",
      url: "http://localhost:3001/api/logged_in",
      headers: { cookie: context.req.headers.cookie },
    });

    const favBooks = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/fav_books`,
      headers: { cookie: context.req.headers.cookie },
    });
    return {
      props: { books: favBooks.data },
    };
  } catch (error) {
    return {
      props: {
        books: null,
      },
    };
  }
};

const FavoriteBooks = ({ books, userState }) => {
  const slug = (title, id) =>
    slugify(`${title}-${id}`, { lower: true, strict: true });

  if (userState.isLogged) {
    if (books.length == 0) {
      return (
        <div>
          <WelcomeTop text="Your favorite books" bcgImg="bg-liked-books" />
          <div className="w-4/5 mx-auto">
            <NoItem itemType="favorite books" />
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
    }
    return (
      <div>
        <WelcomeTop text="Your favorite books" bcgImg="bg-liked-books" />
        <div className="mt-10 w-4/5 mx-auto">
          {books.map((book) => {
            return (
              <Link href={`/books/${slug(book.title, book.id)}`} key={book.id}>
                <div className="border rounded-md my-10 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 animate-show-up cursor-pointer">
                  <BookCard bookData={book} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <NoAccess />;
  }
};

export default FavoriteBooks;
