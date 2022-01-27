import Head from "next/head";
import { useState } from "react";
import { Box, Layers, ArrowUpRight, RefreshCw } from "react-feather";

import { capitalize } from "../lib/utils";
import Button from "../components/navigation/Button";
import CategoryButton from "../components/navigation/CategoryButton";
import SearchInput from "../components/navigation/SearchInput";
import Link from "next/link";
import { getCategories } from "../lib/serverSideMethods";

export const getStaticProps = async () => {
  const categories = await getCategories();
  const realCategories = categories.data.filter((cat) => cat.id !== 25);

  return {
    props: { categories: realCategories },
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
    <div className="pb-10 bg-gradient-to-br from-gray-50 via-gray-100 to-blue-50">
      <Head>
        <title>Wysebits</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-60 lg:h-54 xl:h-42 mx-auto bg-library bg-cover bg-center mb-10">
        <div className="bg-gray-900 h-full bg-opacity-80 relative">
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

      <div className="xl:flex xl:w-11/12 xl:mx-auto">
        <div className="mx-auto mb-20 xl:mb-10 w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/5 px-4 xl:py-0 xl:border-b-2">
          <div className="text-gray-700 gap-x-5 mb-10 md:mb-8 xl:py-8 xl:border-blue-400 xl:border-t-4 xl:border-l-4 xl:rounded xl:bg-white">
            <div className="text-5xl mb-5 text-center">
              Search {capitalize(searchMode)}
            </div>
            <div
              className="flex justify-between w-3/4 md:w-3/5 border-2 border-white xl:border-gray-200 mx-auto px-3 items-center text-gray-400 cursor-pointer bg-gray-50 hover:shadow xl:hover:shadow-none hover:px-5 active:shadow-inner active:bg-gray-200 transition-all rounded-md py-2"
              onClick={toggleSearchMode}
            >
              <div>
                <RefreshCw size={16} strokeWidth={1.6} />
              </div>
              <div className="text-sm">
                {searchMode === "books"
                  ? "or switch to authors"
                  : "switch to books"}
              </div>
            </div>
          </div>

          <div className="mb-5">
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

        <div className="mb-10 w-4/5 mx-auto md:w-5/6 lg:w-4/6 xl:w-1/2 border-b-2 pb-10">
          <div className="flex justify-around items-center text-gray-700 gap-x-5 mb-10 md:mb-16 border-blue-400 border-r-4 border-b-4 shadow-md rounded bg-white py-8 xl:py-16">
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
        <div className="my-16 w-4/5 mx-auto md:w-4/6 lg:w-3/6 xl:w-2/5 px-2 py-5 shadow-md rounded-md border-t-2 border-blue-400 bg-blue-50 hover:bg-gray-100 active:shadow-inner active:bg-white transition-colors cursor-pointer hover:rounded-md group">
          <div className="flex justify-center items-center gap-x-10">
            <Layers size={36} strokeWidth={1.5} />
            <div className="text-4xl text-gray-700">Go to Feed ...</div>
          </div>
          <div className="text-sm text-gray-500 mt-10 w-4/5 mx-auto text-justify">
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
        <div className="mx-auto md:w-4/5 lg:w-3/5">
          <div className="w-full py-10 mb-10">
            <Link href="/registrations/signup">
              <a className="block w-4/6 mx-auto">
                <Button text="Join to share your knowledge" />
              </a>
            </Link>
          </div>
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
