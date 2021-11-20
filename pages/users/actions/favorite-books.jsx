import axios from "axios";
import BookCard from "../../../components/BookCard";

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
    <div className="mt-20">
      {books.map((book) => {
        return (
          <div className="border rounded-md my-10 w-4/5 mx-auto bg-gray-100 animate-show-up">
            <BookCard bookData={book} key={book.id} />
          </div>
        );
      })}
    </div>
  );
};

export default FavoriteBooks;
