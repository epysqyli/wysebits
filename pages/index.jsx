import Head from "next/head";
import { useState } from "react";
import { Box, Layers, ArrowUpRight, RefreshCw } from "react-feather";

import { capitalize } from "../lib/utils";
import CategoryButton from "../components/navigation/CategoryButton";
import SearchInput from "../components/navigation/SearchInput";
import Link from "next/link";
import { getCategories } from "../lib/serverSideMethods";

export const getStaticProps = async () => {
  const categories = await getCategories();

  return {
    props: { categories: categories.data },
  };
};

const Home = ({ categories, userState }) => {
  const booksSearchConfig = {
    pageDest: "/books/search/",
    placeholder: "Search for any book",
    suggestLink: "/books/",
  };

  const authorsSearchConfig = {
    pageDest: "/authors/search/",
    placeholder: "Search for any author",
    suggestLink: "/authors/",
  };

  const [searchMode, setSearchMode] = useState("books");
  const [searchConfig, setSearchConfig] = useState(booksSearchConfig);

  const toggleSearchMode = () => {
    if (searchMode === "books") {
      setSearchConfig(authorsSearchConfig);
      setSearchMode("authors");
    }

    if (searchMode === "authors") {
      setSearchConfig(booksSearchConfig);
      setSearchMode("books");
    }
  };

  return (
    <div>
      <Head>
        <title>Wysebits</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-60 lg:h-54 xl:h-42 mx-auto bg-library bg-cover bg-center md:mb-12 lg:w-4/5 lg:mt-5 lg:rounded-md">
        <div className="bg-gray-900 h-full bg-opacity-80 relative lg:rounded-md">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-white text-6xl font-bold text-center">
              Wysebits.
            </h1>
            <p className="text-white text-center text-2xl my-5">
              Knowledge. Distilled.
            </p>
          </div>
        </div>
      </div>

      <div className="xl:flex xl:w-11/12 xl:mx-auto 2xl:w-5/6">
        <div className="mx-auto mb-20 xl:mb-10 w-11/12 md:w-4/6 lg:w-3/5 xl:w-2/5 px-4 py-0 xl:border-b-2">
          <div className="text-gray-700 md:mb-8 py-10 xl:py-5 rounded-md md:bg-white md:border-blue-400 md:border-t-2 md:shadow-md">
            <div className="text-5xl mb-5 md:mb-12 text-center text-gray-50 md:text-gray-800">
              Search {capitalize(searchMode)}
            </div>
            <div
              className="flex justify-between px-5 items-center gap-x-5 w-4/6 md:w-3/5 lg:w-2/5 xl:w-3/5 2xl:w-2/5 mx-auto border md:border-none md:bg-gray-50 py-2 rounded-md cursor-pointer hover:shadow-md transition-all active:shadow-inner active:px-7"
              onClick={toggleSearchMode}
            >
              <div>
                <RefreshCw size={20} strokeWidth={1.6} />
              </div>
              <div className="text-sm">
                {searchMode === "books"
                  ? "or switch to authors"
                  : "switch to books"}
              </div>
            </div>
          </div>

          <div className="mb-36 mx-auto">
            <SearchInput
              pageDest={searchConfig.pageDest}
              placeholder={searchConfig.placeholder}
              suggestLink={searchConfig.suggestLink}
              searchMode={searchMode}
              showSuggest={true}
              showHistory={true}
            />
          </div>
        </div>

        <div className="mb-10 w-11/12 mx-auto md:w-5/6 lg:w-3/5 xl:w-1/2 border-b-2 pb-10">
          <div className="flex justify-around items-center text-gray-700 bg-white gap-x-5 mb-10 md:mb-16 md:bg-white border-blue-400 border-t-2 shadow-md rounded-md py-8 xl:py-16">
            <div className="text-4xl xl:text-5xl">Categories</div>
            <Box size={52} strokeWidth={1.5} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4">
            {categories.map((category) => {
              return <CategoryButton category={category} key={category.id} />;
            })}
          </div>
        </div>
      </div>

      <Link href="/feed">
        <div className="mt-16 mb-24 w-4/5 mx-auto md:w-4/6 lg:w-2/5 2xl:w-1/4 px-2 py-5 lg:py-10 shadow-md rounded-md border-t-2 border-blue-400 bg-white hover:bg-blue-50 active:shadow-inner active:bg-blue-100 transition-colors cursor-pointer group">
          <div className="flex justify-center items-center gap-x-10">
            <Layers size={36} strokeWidth={1.5} />
            <div className="text-4xl text-gray-700">Go to Feed ...</div>
          </div>
          <div className="text-sm text-gray-600 mt-10 w-4/5 mx-auto text-justify">
            ... at your own peril of potentially wasting a lot of time scrolling
            through users' insights convincing yourself that you are learning
            valuable things while you are instead most probably mindlessly
            procrastinating away from your next useful real life task.{" "}
            <span className="font-medium">It's great!</span>
          </div>
          <div className="mx-auto w-min mt-10">
            <ArrowUpRight
              size={36}
              strokeWidth={1.5}
              color="gray"
              className="group-hover:scale-125 transition-transform group-hover:animate-ping"
            />
          </div>
        </div>
      </Link>

      {userState.isLogged ? null : (
        <div className="mx-auto md:w-4/5 lg:w-3/5 mt-5 mb-10">
          <Link href="/about">
            <div className="underline text-center mx-auto w-4/5 cursor-pointer">
              Wyse what? Click here to know more about it!
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
