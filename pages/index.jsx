import Head from "next/head";
import { useState } from "react";
import { Box, Layers, ArrowUpRight, Repeat } from "react-feather";
import { capitalize } from "../lib/utils";
import CategoryButton from "../components/navigation/CategoryButton";
import SearchInput from "../components/navigation/SearchInput";
import Link from "next/link";
import { getCategories, getWeeklyTrend } from "../lib/serverSideMethods";
import TrendingBook from "../components/trending/TrendingBook";
import TrendingUser from "../components/trending/TrendingUser";
import TrendingEntry from "../components/trending/TrendingEntry";

export const getStaticProps = async () => {
  const categories = await getCategories();
  const weeklyTrend = await getWeeklyTrend();

  return {
    props: { categories: categories.data, trending: weeklyTrend.data },
  };
};

const Home = ({ categories, userState, trending }) => {
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
    <>
      <Head>
        <title>Wysebits</title>
        <meta
          name="description"
          content="The no-frills social network for book lovers. Knowledge: distilled. Share your insights for the books you have and explore other users' ideas."
        />
        <link rel="icon" href="/logo.png" />
      </Head>

      <div className="h-64 xl:h-42 mx-auto bg-library bg-cover bg-center md:mb-12 lg:w-4/5 lg:mt-5 lg:rounded-md shadow-lg">
        <div className="bg-gray-900 h-full bg-opacity-50 relative lg:rounded-md">
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
        <div className="mx-auto mb-20 xl:mb-10 px-4 w-11/12 md:w-4/6 lg:w-3/5 xl:w-2/5 xl:border-b-2">
          <div className="text-gray-700 md:mb-8 pt-10 pb-5 xl:py-7 rounded-md xl:border-t-blue-400 xl:border-t-2 xl:shadow xl:bg-gray-50">
            <div className="text-5xl md:text-6xl xl:text-5xl text-white xl:text-gray-600 xl:font-normal mb-5 md:mb-12 text-center lg:font-bold tracking-tight">
              Search {capitalize(searchMode)}
            </div>
            <div
              className="flex justify-between px-5 items-center group gap-x-5 w-4/6 md:w-3/5 lg:w-2/5 xl:w-3/5 2xl:w-2/5 mx-auto border-b xl:border xl:bg-gray-50 xl:border-blue-400 xl:rounded py-2 cursor-pointer hover:text-white md:hover:text-black xl:hover:bg-blue-200 transition-all active:shadow-inner tracking-tight"
              onClick={toggleSearchMode}
            >
              <div className="transition-transform">
                <Repeat size={18} strokeWidth={1.6} />
              </div>
              <div className="group-active:scale-95 text-gray-700">
                {searchMode === "books"
                  ? "switch to authors"
                  : "switch to books"}
              </div>
            </div>
          </div>
          <div className="mt-10 mx-auto md:w-5/6">
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

        <div className="mb-20 mt-32 xl:mt-0 xl:mb-10 w-11/12 mx-auto md:w-5/6 lg:w-3/5 xl:w-1/2 border-b-2 pb-10">
          <div className="flex justify-around items-center text-gray-700 bg-white gap-x-5 mb-10 md:mb-16 md:bg-white border-blue-400 border-t-2 shadow-md rounded-md py-8 xl:py-16">
            <div className="text-4xl lg:text-5xl text-gray-600">Categories</div>
            <Box size={60} strokeWidth={1.5} fill="white" color="#7F92A0" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4">
            {categories.map((category) => {
              return <CategoryButton category={category} key={category.id} />;
            })}
          </div>
        </div>
      </div>

      <Link href="/feed">
        <div className="mx-auto mt-16 mb-24 w-11/12 md:w-3/5 lg:w-2/5 2xl:w-1/4 px-2 py-5 lg:py-12 shadow-md rounded-md border-t-2 border-blue-400 bg-white hover:bg-blue-50 active:shadow-inner active:bg-blue-100 transition-colors cursor-pointer group">
          <div className="flex justify-center items-center gap-x-10">
            <Layers size={36} strokeWidth={1.5} />
            <div className="text-4xl text-gray-700">Feed</div>
            <ArrowUpRight
              size={36}
              strokeWidth={1.5}
              color="gray"
              className="group-hover:scale-125 transition-transform group-hover:animate-ping"
            />
          </div>
          <div className="text-gray-600 mt-16 w-4/5 mx-auto text-center text-xl">
            Check the latest insights from all users
          </div>
        </div>
      </Link>

      <div className="w-11/12 2xl:w-4/6 mx-auto mb-20">
        <span className="block text-gray-50 text-center mb-10 lg:mb-5 text-5xl border-t-2 pt-10">
          Trending this week
        </span>
        <div className="lg:flex justify-around items-center">
          <div className="md:w-4/5 mx-auto lg:w-1/2 2xl:w-1/3 mt-10 lg:mt-0">
            <TrendingBook book={trending.book} />
          </div>
          <div className="md:w-4/5 mx-auto lg:w-1/3 mt-10 lg:mt-0">
            <TrendingUser user={trending.user} />
          </div>
        </div>
        <div className="md:w-4/5 md:mx-auto mt-10 lg:mt-20 lg:w-3/5">
          <TrendingEntry entry={trending.insight} />
        </div>
      </div>

      {userState.isLogged ? null : (
        <div className="mx-auto md:w-4/5 lg:w-3/5 mt-5 my-10">
          <Link href="/about">
            <div className="underline text-center mx-auto w-4/5 cursor-pointer text-white">
              Wyse what? Click here to know more about it!
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;
