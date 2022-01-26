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
      <div>
        <div className="bg-categories bg-cover bg-center shadow">
          <div className="bg-gray-800 bg-opacity-70 text-white text-4xl font-bold text-center py-16">
            {capitalize(categoryName)}
          </div>
        </div>

        <div className="py-10 w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
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

        <div className="flex items-center py-16 lg:py-32 w-4/5 md:w-2/6 mx-auto gap-x-4 md:gap-x-20">
          <div className="w-1/2">
            <PageNavButton
              direction="left"
              url={pagy.prev_url}
              clientUrl={clientUrl}
            />
          </div>
          <div className="w-1/2">
            <PageNavButton
              direction="right"
              url={pagy.next_url}
              clientUrl={clientUrl}
            />
          </div>
        </div>
      </div>
    );

  if (books.length === 0)
    return (
      <div>
        <div className="bg-categories bg-cover bg-center shadow">
          <div className="bg-gray-800 bg-opacity-70 text-white text-4xl font-bold text-center py-16">
            {capitalize(categoryName)}
          </div>
        </div>
        <div className="mx-auto w-4/5 md:w-4/6 lg:w-3/6 xl:w-2/6 2xl:w-1/3 py-20 lg:py-40 2xl:py-48">
          <NoItem message="This category is empty, meaning no books have been assigned to it. Explore books and contribute insights to improve WyseBits for all." />
          <div className="border px-5 mt-20 lg:mt-32 bg-gray-100 rounded-md shadow group transition-all cursor-pointer hover:shadow-md">
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
