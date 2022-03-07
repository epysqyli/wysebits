import Head from "next/head";
import { capitalize, slug } from "../../../lib/utils";
import { getAuthor } from "../../../lib/serverSideMethods";
import BookCard from "../../../components/books/BookCard";
import Pagination from "../../../components/navigation/Pagination";
import NoItem from "../../../components/users/NoItem";
import SearchInput from "../../../components/navigation/SearchInput";
import Link from "next/dist/client/link";

export const getServerSideProps = async (context) => {
  const urlSlug = context.query.slug;
  const splitSlug = context.query.slug.split("-");
  const authorName = splitSlug
    .slice(0, splitSlug.length - 1)
    .map((str) => capitalize(str))
    .join(" ");
  const id = splitSlug[splitSlug.length - 1];
  const pageNum = context.query.page;

  const author = await getAuthor(id, pageNum);

  return {
    props: {
      books: author.data.books,
      pagy: author.data.pagy,
      authorName: authorName,
      urlSlug: urlSlug,
    },
  };
};

const Author = ({ books, pagy, authorName, urlSlug }) => {
  const clientUrl = `/authors/${urlSlug}`;

  if (books.length !== 0)
    return (
      <>
        <Head>
          <title>{authorName}</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <div className="bg-author bg-cover bg-center shadow">
          <div className="bg-gray-800 bg-opacity-70 text-white text-4xl text-center py-16">
            {authorName}
          </div>
        </div>

        <div className="py-10 w-11/12 lg:w-4/5 xl:w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
          {books.map((book) => {
            return (
              <Link
                href={`/books/${slug(book.title, book.id)}/1`}
                key={book.id}
              >
                <div className="rounded-md bg-white shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all cursor-pointer active:shadow-inner border-b-2 border-blue-200 hover:border-blue-300">
                  <BookCard bookData={book} />
                </div>
              </Link>
            );
          })}
        </div>

        <Pagination clientUrl={clientUrl} pagy={pagy} />
      </>
    );

  return (
    <>
      <Head>
        <title>{authorName}</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="bg-author bg-cover bg-center shadow">
        <div className="bg-gray-800 bg-opacity-70 text-white text-4xl text-center py-16">
          {authorName}
        </div>
      </div>

      <div className="mx-auto w-4/5 md:w-4/6 lg:w-3/6 xl:w-2/6 2xl:w-1/3 py-20 lg:py-40 2xl:py-48">
        <NoItem message="This author has no books assigned to him/her." />
        <div className="border px-5 mt-20 lg:mt-32 bg-gray-100 rounded-md shadow group transition-all cursor-pointer hover:shadow-md">
          <div className="px-3 pt-5">
            It might be that the author's books need to be assigned to him/her.
            You can do this while posting your insights for a specific book.
          </div>
          <div className="mt-10">
            <SearchInput
              pageDest="/users/book-search/"
              placeholder="Any book of the author in mind?"
              searchMode="books"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Author;
