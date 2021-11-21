import axios from "axios";
import WelcomeTop from "../../components/users/WelcomeTop";
import BookCard from "../../components/BookCard";

export const getServerSideProps = async (context) => {
  const slug = context.query.category;
  const categoryName = slug.split("-").join(" ");

  const books = await axios.get(
    `http://localhost:3001/api/categories/${slug}/books`
  );

  return {
    props: { books: books.data.books, pagy: books.data.pagy, categoryName },
  };
};

const Category = ({ books, categoryName, pagy }) => {
  const capitalize = (str) => {
    return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
  };

  return (
    <div>
      <WelcomeTop firstLine={capitalize(categoryName)} />

      <div className="w-4/5 mx-auto my-10">
        {books.map((book) => {
          return (
            <div className="my-10 border rounded-md bg-gray-100 hover:bg-gray-200 animate-show-up cursor-pointer active:bg-gray-300">
              <BookCard bookData={book} key={book.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
