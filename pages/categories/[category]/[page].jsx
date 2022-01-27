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

  if (books.length !== 0)
    return (
      <div className="pb-52 md:pb-60 lg:pb-72 2xl:pb-80 bg-gradient-to-br from-blue-50 via-gray-100 to-gray-200">
        <div className="bg-categories bg-cover bg-center shadow">
          <div className="bg-gray-800 bg-opacity-70 text-white text-4xl font-bold text-center py-16">
            {capitalize(categoryName)}
          </div>
        </div>

        <div className="pt-10 w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
          {books.map((book) => {
            return (
              <Link
                href={`/books/${slug(book.title, book.id)}/1`}
                key={book.id}
              >
                <div className="rounded-md bg-gray-50 transition-colors animate-show-up cursor-pointer active:shadow-inner border-2 border-gray-300 hover:border-gray-400">
                  <BookCard bookData={book} />
                </div>
              </Link>
            );
          })}
        </div>

        {pagy.prev === null && pagy.next === null ? null : (
          <div className="flex justify-around pt-16 md:w-4/5 lg:w-1/2 mx-auto">
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
        )}
      </div>
    );

  if (books.length === 0)
    return (
      <div className="pb-52 md:pb-60 lg:pb-72 2xl:pb-80 bg-gradient-to-br from-blue-50 via-gray-100 to-gray-200">
        <div className="bg-categories bg-cover bg-center shadow">
          <div className="bg-gray-800 bg-opacity-70 text-white text-4xl font-bold text-center py-16">
            {capitalize(categoryName)}
          </div>
        </div>

        <div className="mx-auto w-4/5 md:w-4/6 lg:w-3/6 xl:w-1/2 2xl:w-1/3 py-20 lg:py-40 2xl:py-48">
          <NoItem message="This category is empty, meaning no books have been assigned to it. Explore books and contribute insights to improve WyseBits for all." />
          <div className="border px-5 mt-20 lg:mt-32 bg-gray-50 rounded-md shadow group transition-all cursor-pointer hover:shadow-md">
            <div className="px-3 pt-5">
              Start contributing now by choosing the first book for which you
              want to add your own personal insights
            </div>
            <div className="mt-10">
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
};

export default Category;
