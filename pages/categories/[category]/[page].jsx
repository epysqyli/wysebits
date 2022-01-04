import BookCard from "../../../components/books/BookCard";
import Link from "next/link";
import PageNavButton from "../../../components/navigation/PageNavButton";
import NoItem from "../../../components/users/NoItem";
import SearchInput from "../../../components/navigation/SearchInput";
import { getCategoryBooks } from "../../../lib/serverSideMethods";
import { slug, capitalize } from "../../../lib/utils";

export const getServerSideProps = async (context) => {
  const slug = context.query.category;
  const pageNum = context.query.page;
  const categoryName = slug.split("-").join(" ");

  const books = await getCategoryBooks(slug, pageNum);

  return {
    props: {
      books: books.data.books,
      pagy: books.data.pagy,
      categoryName: categoryName,
      categorySlug: slug,
    },
  };
};

const Category = ({ books, categoryName, categorySlug, pagy }) => {
  const clientUrl = `/categories/${categorySlug}`;

  if (books.length != 0) {
    return (
      <div>
        <div className="bg-categories bg-cover bg-center shadow">
          <div className="bg-gray-800 bg-opacity-70 text-white text-4xl font-bold text-center py-16">
            {capitalize(categoryName)}
          </div>
        </div>

        <div className="mt-10 w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
          {books.map((book) => {
            return (
              <Link
                href={`/books/${slug(book.title, book.id)}/1`}
                key={book.id}
              >
                <div className="rounded-md shadow-md bg-gray-100 hover:bg-gray-200 animate-show-up cursor-pointer active:shadow-inner">
                  <BookCard bookData={book} />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex justify-around my-16 md:w-4/5 mx-auto">
          <div className="w-1/3">
            <PageNavButton
              btnText="Previous page"
              url={pagy.prev_url}
              clientUrl={clientUrl}
            />
          </div>
          <div className="w-1/3">
            <PageNavButton
              btnText="Next page"
              url={pagy.next_url}
              clientUrl={clientUrl}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="bg-categories bg-cover bg-center shadow">
          <div className="bg-gray-800 bg-opacity-70 text-white text-4xl font-bold text-center py-16">
            {capitalize(categoryName)}
          </div>
        </div>
        <div className="w-4/5 md:w-4/6 lg:w-3/6 mx-auto my-20">
          <NoItem message="This category is empty, meaning no books have been assigned to it. Explore books and contribute insights to improve WyseBits for all." />
          <div className="border px-5 bg-gray-100 rounded-md shadow group transition-all cursor-pointer hover:shadow-md">
            <div className="px-3 pt-5">
              Start contributing now by choosing the first book for which you
              want to add your own personal insights
            </div>
            <div className="mt-10">
              <SearchInput
                pageDest="/users/book-search/"
                placeholder="Any book in mind?"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Category;
