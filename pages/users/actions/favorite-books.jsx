import axios from "axios";
import BookCard from "../../../components/BookCard";
import WelcomeTop from "../../../components/users/WelcomeTop";

export const getServerSideProps = async (context) => {
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
};

const FavoriteBooks = ({ books }) => {
  return (
    <div>
      <WelcomeTop firstLine="Your favorite books" />
      <div className="mt-10 w-4/5 mx-auto">
        {books.map((book) => {
          return (
            <div className="border rounded-md my-10 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 animate-show-up cursor-pointer">
              <BookCard bookData={book} key={book.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoriteBooks;
