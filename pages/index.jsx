import Head from "next/head";
import { Book, Box, Layers, ArrowUpRight, RefreshCw } from "react-feather";
import Button from "../components/navigation/Button";
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
  return (
    <div className="pb-10 animate-show-up">
      <Head>
        <title>Wysebits</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-60 lg:h-48 xl:h-42 mx-auto bg-library bg-cover bg-center mb-10">
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
          <div className="flex justify-center items-center gap-x-5 md:gap-x-10">
            <Book size={36} strokeWidth={1.5} />
            <div className="text-4xl text-gray-700">Explore books</div>
            <RefreshCw
              size={26}
              className="cursor-pointer text-gray-600 hover:scale-110 hover:text-gray-800 active:scale-100"
            />
          </div>
          <div className="mt-10 mb-5">
            <SearchInput
              pageDest="/books/search/"
              placeholder="Search for any book"
              showSuggest={true}
              suggestLink="/books/"
              showHistory={true}
            />
          </div>
        </div>

        <div className="mb-10 w-4/5 mx-auto md:w-4/6 lg:w-3/6 border-b-2 pb-10">
          <div className="flex justify-center items-center gap-x-5 mb-10">
            <Box size={36} strokeWidth={1.5} />
            <div className="text-3xl xl:text-4xl text-gray-700">
              Explore categories
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4">
            {categories.map((category) => {
              return <CategoryButton category={category} key={category.id} />;
            })}
          </div>
        </div>
      </div>

      <Link href="/feed">
        <div className="mb-10 w-4/5 mx-auto md:w-4/6 lg:w-3/6 px-2 py-3 border-b-2 pb-10 hover:bg-gray-100 active:shadow-inner active:bg-white transition-colors cursor-pointer rounded group">
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
