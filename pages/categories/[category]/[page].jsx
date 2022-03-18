import Head from "next/dist/shared/lib/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import BookCard from "../../../components/books/BookCard";
import Pagination from "../../../components/navigation/Pagination";
import NoItem from "../../../components/users/NoItem";
import SearchInput from "../../../components/navigation/SearchInput";
import { getCategoryBooks } from "../../../lib/serverSideMethods";
import { capitalize, slug } from "../../../lib/utils";
import HeaderImage from "../../../components/categories/HeaderImage";
import SpecificSearch from "../../../components/search/SpecificSearch";
import { searchWithinCategory } from "../../../lib/searchMethods";

export const getServerSideProps = async (context) => {
  if (context.query.category.includes("|q=")) {
    const searchTerms = context.query.category
      .split("|q=")[1]
      .split("=q|")[0]
      .split("-")
      .join(" ");

    const slug = context.query.category.split("|q=")[0].split("/")[0];
    const page = context.query.page;
    const books = await searchWithinCategory(slug, searchTerms, page);

    const categoryName = slug.split("-").join(" ");
    const url = `/categories/${context.query.category}`;

    return {
      props: {
        books: books.data.results,
        pagy: books.data.pagy,
        categoryName: categoryName,
        categorySlug: slug,
        currentUrl: url,
      },
    };
  }

  // base case with no search query
  const slug = context.query.category;
  const page = context.query.page;
  const categoryName = slug.split("-").join(" ");

  const books = await getCategoryBooks(slug, page);
  const url = `/categories/${slug}`;

  return {
    props: {
      books: books.data.books,
      pagy: books.data.pagy,
      categoryName: categoryName,
      categorySlug: slug,
      currentUrl: url,
    },
  };
};

const Category = ({ books, categoryName, categorySlug, pagy, currentUrl }) => {
  const [results, setResults] = useState(books);
  const [url, setUrl] = useState(currentUrl);
  const [tmpPagy, setTmpPagy] = useState(null);

  useEffect(() => setResults(books), [books]);

  useEffect(() => {
    if (tmpPagy) {
      if (tmpPagy.next === pagy.page) setTmpPagy(null);
    }
  }, []);

  if (books.length !== 0)
    return (
      <>
        <Head>
          <title>{capitalize(categoryName)} Books</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <HeaderImage name={categoryName} slug={categorySlug} />
        <div className="my-5">
          <SpecificSearch
            categorySlug={categorySlug}
            placeholder="Search within category"
            setResults={setResults}
            url={url}
            setUrl={setUrl}
            setTmpPagy={setTmpPagy}
          />
        </div>
        <div className="pt-10 pb-20 w-11/12 lg:w-4/5 xl:w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
          {results.map((book) => {
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

        <Pagination clientUrl={url} pagy={tmpPagy || pagy} />
      </>
    );

  if (books.length === 0)
    return (
      <>
        <Head>
          <title>{capitalize(categoryName)} Books</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <HeaderImage name={categoryName} slug={categorySlug} />
        <div className="mx-auto w-4/5 md:w-4/6 lg:w-3/6 xl:w-1/2 2xl:w-1/3 py-20 lg:py-40 2xl:py-48">
          <NoItem message="This category is empty, meaning no books have been assigned to it. Explore books and contribute insights to improve WyseBits." />
          <div className="border px-5 mt-20 lg:mt-32 bg-gray-50 rounded-md shadow group transition-all cursor-pointer hover:shadow-md">
            <div className="px-3 pt-5">
              You can assign books to specific categories on the same page you
              write insights, by clicking below the book cover
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
      </>
    );
};

export default Category;
