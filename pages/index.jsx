import { Layers, List } from "react-feather";
import CategoryButton from "../components/navigation/CategoryButton";
import MultiSearch from "../components/navigation/MultiSearch";
import Link from "next/link";
import { getCategories, getWeeklyTrend } from "../lib/serverSideMethods";
import TrendingBook from "../components/trending/TrendingBook";
import TrendingUser from "../components/trending/TrendingUser";
import TrendingEntry from "../components/trending/TrendingEntry";
import IconAndTitle from "../components/layout/IconAndTitle";

export const getStaticProps = async () => {
  const categories = await getCategories();
  const weeklyTrend = await getWeeklyTrend();

  return {
    props: {
      categories: categories.data.filter(
        (category) => category.name !== "Various"
      ),
      trending: weeklyTrend.data,
    },
  };
};

const Home = ({
  categories,
  userState,
  trending,
  addOverlay,
  removeOverlay,
}) => {
  return (
    <div className="pt-12 lg:pt-16 2xl:pt-20">
      <IconAndTitle title="Wysebits" />

      <div className="h-48 md:h-56 xl:h-42 mx-auto bg-library bg-cover bg-center md:mb-12 lg:w-4/5 lg:rounded-md border-b-2 border-white">
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

      <div className="xl:flex xl:w-11/12 xl:mx-auto 2xl:w-3/4">
        <div className="mx-auto mb-20 xl:mb-10 px-4 w-11/12 md:w-4/6 lg:w-3/5 xl:w-2/5">
          <div className="text-gray-700 md:mb-8 pt-10 pb-5 xl:py-7 xl:border-b-2 mt-2 lg:mt-0">
            <div className="text-5xl md:text-6xl text-white mb-5 md:my-9 text-center font-medium tracking-tight">
              Search Books
            </div>
          </div>
          <div className="mt-10 xl:mt-16 mx-auto">
            <MultiSearch />
          </div>
        </div>

        <div className="mb-12 mt-32 xl:mt-0 xl:mb-10 w-11/12 mx-auto md:w-5/6 lg:w-3/5 xl:w-1/2 pb-10">
          <div className="hidden xl:flex justify-center items-center xl:border-b-2 gap-x-5 xl:gap-x-10 mb-10 md:mb-16 py-8 xl:py-16">
            <List size={60} strokeWidth={2} className="text-white" />
            <div className="text-5xl lg:text-6xl text-gray-50 font-medium">
              Categories
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4">
            {categories.map((category) => {
              return <CategoryButton category={category} key={category.id} />;s
            })}
          </div>
        </div>
      </div>

      <Link href="/feed">
        <div className="mx-auto my-16 lg:my-20 w-11/12 md:w-3/5 lg:w-2/5 2xl:w-1/4 px-2 py-14 rounded-md border-t-2 border-blue-400 bg-white hover:bg-gray-50 active:shadow-inner active:bg-blue-100 transition-colors cursor-pointer">
          <div className="text-gray-600 mx-auto">
            <Layers size={60} strokeWidth={1.5} className="mb-10 mx-auto" />
            <div className="text-center text-4xl font-medium">
              Latest insights
            </div>
          </div>
        </div>
      </Link>

      <div className="w-11/12 xl:w-4/5 2xl:w-3/4 mx-auto mb-20">
        <span className="block text-gray-50 text-center mb-10 text-5xl pt-16">
          Trending this week
        </span>
        <div className="lg:flex justify-around items-center">
          <div className="md:w-4/5 mx-auto lg:w-1/2 xl:w-1/2 2xl:w-2/5 mt-10 lg:mt-0">
            <TrendingBook book={trending.book} />
          </div>
          <div className="md:w-4/5 mx-auto lg:w-1/3 xl:w-2/5 mt-10 lg:mt-0">
            <TrendingUser user={trending.user} />
          </div>
        </div>
        <div className="md:w-4/5 md:mx-auto mt-10 lg:mt-20 lg:w-3/5 2xl:w-1/2">
          <TrendingEntry
            entry={trending.insight}
            userId={userState.user.id}
            addOverlay={addOverlay}
            removeOverlay={removeOverlay}
          />
        </div>
      </div>

      {userState.isLogged ? null : (
        <div className="mx-auto md:w-4/5 lg:w-3/5 mt-5 my-10">
          <Link href="/about">
            <div className="underline text-center mx-auto w-4/5 cursor-pointer text-white">
              Wyse what? Click here to know more!
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
