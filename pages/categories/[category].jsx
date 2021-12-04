import slugify from "slugify";
import axios from "axios";
import BookCard from "../../components/books/BookCard";
import Link from "next/link";
import PageNavButton from "../../components/navigation/PageNavButton";

export const getServerSideProps = async (context) => {
  const slug = context.query.category;
  const categoryName = slug.split("-").join(" ");

  const books = await axios.get(
    `http://localhost:3001/api/categories/${slug}/books?page=`
  );

  return {
    props: {
      books: books.data.books,
      pagy: books.data.pagy,
      categoryName,
      categorySlug: slug,
    },
  };
};

const Category = ({ books, categoryName, categorySlug, pagy }) => {
  const capitalize = (str) => {
    return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
  };

  const slug = (title, id) =>
    slugify(`${title}-${id}`, { lower: true, strict: true });

  return (
    <div>
      <div className="bg-categories bg-cover bg-center shadow">
        <div className="bg-gray-800 bg-opacity-70 text-white text-4xl font-bold text-center py-16">
          {capitalize(categoryName)}
        </div>
      </div>

      <div className="w-4/5 mx-auto my-10">
        {books.map((book) => {
          return (
            <Link href={`/books/${slug(book.title, book.id)}`} key={book.id}>
              <div className="my-10 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 animate-show-up cursor-pointer active:bg-gray-300">
                <BookCard bookData={book} />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center my-16 w-4/5 mx-auto gap-x-4">
        <div className="w-1/2">
          <PageNavButton
            btnText="Previous page"
            url={pagy.prev_url}
            categorySlug={categorySlug}
          />
        </div>
        <div className="w-1/2">
          <PageNavButton
            btnText="Next page"
            url={pagy.next_url}
            categorySlug={categorySlug}
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
