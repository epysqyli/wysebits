import Head from "next/head";
import { useState } from "react";
import {
  Book,
  Box,
  Layers,
  ArrowUpRight,
  RefreshCw,
  Users,
} from "react-feather";

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
    <div className="pb-10 animate-show-up">
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
        <div className="mb-10 w-4/5 mx-auto md:w-4/6 lg:w-3/6 xl:w-2/6 px-2 py-3 xl:py-0 border-b-2">
          <div className="flex justify-between items-center text-gray-700 px-2">
            <div className="text-4xl xl:text-5xl w-4/6">
              {capitalize(searchMode)}
            </div>
            {searchMode === "books" ? (
              <Book size={40} strokeWidth={1.5} />
            ) : (
              <Users size={40} strokeWidth={1.5} />
            )}
            <div
              className="group p-2 rounded-xl border-2 cursor-pointer active:shadow-inner bg-white active:bg-gray-100"
              onClick={toggleSearchMode}
            >
              <RefreshCw
                size={20}
                strokeWidth={1.5}
                className="text-gray-600 group-hover:scale-105 group-hover:text-gray-800 group-active:scale-100 transition-transform"
              />
            </div>
          </div>
          <div className="mt-12 md:mt-20 mb-5">
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

        <div className="mb-10 w-4/5 mx-auto md:w-4/6 lg:w-3/6 border-b-2 pb-10">
          <div className="flex justify-between xl:justify-around items-center text-gray-700 gap-x-5 mb-10 md:mb-20">
            <div className="text-4xl xl:text-5xl">Categories</div>
            <Box size={40} strokeWidth={1.5} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4">
            {categories.map((category) => {
              return <CategoryButton category={category} key={category.id} />;
            })}
          </div>
        </div>
      </div>

      <Link href="/feed">
        <div className="mb-10 w-4/5 mx-auto md:w-4/6 lg:w-3/6 px-2 py-3 border-b-2 pb-10 hover:bg-gray-100 active:shadow-inner active:bg-white transition-colors cursor-pointer hover:rounded-md group">
          <div className="flex justify-center items-center gap-x-10">
            <Layers size={36} strokeWidth={1.5} />
            <div className="text-4xl text-gray-700">Go to Feed ...</div>
          </div>
          <div className="text-sm text-gray-500 mt-10 w-4/5 mx-auto text-justify">
            ... at your own peril of potentially wasting a lot of time scrolling
            through users' insights convincing yourself that you are learning
            valuable things while you are instead most probably mindlessly
            procrastinating from your next useful real life task.{" "}
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
