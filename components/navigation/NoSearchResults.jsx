import Head from "next/head";
import { AlertCircle, FilePlus } from "react-feather";
import Link from "next/dist/client/link";
import MultiSearch from "./MultiSearch";

const NoSearchResults = ({ searchMode, bookKeywords, authorKeywords }) => {
  if (searchMode === "books")
    return (
      <div className="pt-10 lg:pt-16">
        <Head>
          <title>No results - Wysebits search</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <div className="py-10 w-4/5 mx-auto md:w-4/6 lg:w-3/6 xl:w-2/6">
          <MultiSearch
            bookKeywords={bookKeywords}
            authorKeywords={authorKeywords}
          />
          <div className="mt-20 flex justify-around items-center">
            <AlertCircle
              size={36}
              strokeWidth={1.5}
              className="rounded-3xl w-1/4 text-gray-100"
              fill="transparent"
            />
            <div className="w-3/4 md:text-lg text-gray-100 text-center">
              Unfortunately your search did not produce any meaningful results
            </div>
          </div>

          <Link href="/users/book-tiles/create/create-book">
            <div className="mt-24 flex justify-around items-center bg-white shadow py-5 rounded-md cursor-pointer hover:shadow-md active:shadow-inner">
              <div className="w-4/6 text-gray-800">
                Create a book entry from scratch if you are sure that your book
                is not in our database
              </div>
              <FilePlus
                className="w-1/6"
                size={36}
                strokeWidth={1.5}
                color="gray"
              />
            </div>
          </Link>
        </div>
      </div>
    );

  if (searchMode === "authors")
    return (
      <div className="pt-10 lg:pt-16">
        <Head>
          <title>No results - Wysebits search</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <div className="py-10 w-4/5 mx-auto md:w-4/6 lg:w-3/6 xl:w-2/6">
          <MultiSearch
            bookKeywords={bookKeywords}
            authorKeywords={authorKeywords}
          />
          <div className="mt-20 flex justify-around items-center">
            <AlertCircle
              size={36}
              strokeWidth={1.5}
              className="rounded-3xl w-1/4 text-gray-100"
              fill="transparent"
            />
            <div className="w-3/4 md:text-lg text-gray-100 text-center">
              Unfortunately your search did not produce any meaningful results
            </div>
          </div>
        </div>
      </div>
    );
};

export default NoSearchResults;
