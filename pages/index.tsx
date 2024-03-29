import { List } from "react-feather";
import CategoryButton from "../components/navigation/CategoryButton";
import MultiSearch from "../components/navigation/MultiSearch";
import Link from "next/link";
import { getCategories, getWeeklyTrend } from "../lib/serverSideMethods";
import TrendingBook from "../components/trending/TrendingBook";
import TrendingUser from "../components/trending/TrendingUser";
import TrendingEntry from "../components/trending/TrendingEntry";
import IconAndTitle from "../components/layout/IconAndTitle";
import IndexFloatingFeed from "../components/feed/IndexFloatingFeed";

export const getStaticProps = async () => {
  const categories = await getCategories();
  const weeklyTrend = await getWeeklyTrend();

  return {
    props: {
      categories: categories.data.filter((category) => category.name !== "Various"),
      trending: weeklyTrend.data
    }
  };
};

const Home = ({ categories, userState, trending }) => {
  return (
    <div className='pt-10 lg:pt-14 2xl:pt-20 relative'>
      <IconAndTitle
        title='Wysebits'
        description='The best idea for every book. Ever felt like you keep forgetting what the personal key takeaways from a book are? Wysebits provides a simple way to share and rank ideas. No quotes, summaries, or other shortcuts. Just ideas.'
      />

      <div className='h-48 md:h-56 xl:h-42 mx-auto bg-library bg-cover bg-center md:mb-12 lg:w-4/5 xl:w-2/3 2xl:w-3/5 lg:rounded-md border-b-2 border-white mt-0.5'>
        <div className='bg-gray-900 h-full bg-opacity-50 relative lg:rounded-md'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <h1 className='text-white text-6xl font-bold text-center mt-3'>Wysebits.</h1>
            <p className='text-white text-center text-2xl my-5'>The best idea for every book</p>
          </div>
        </div>
      </div>

      <div className='xl:flex xl:w-11/12 xl:mx-auto 2xl:w-3/4'>
        <div className='mx-auto mb-20 xl:mb-10 md:mt-10 xl:mt-0 px-4 md:w-4/6 lg:w-3/5 xl:w-2/5 relative py-10 xl:py-0'>
          <div className='text-gray-700 md:mb-8 pb-5 xl:py-7 xl:border-b-2'>
            <div className='text-5xl md:text-6xl lg:text-7xl xl:text-6xl text-white mb-5 md:my-9 text-center font-medium tracking-tight'>
              Search Books
            </div>
          </div>
          <div className='mt-10 xl:mt-16 mx-auto lg:w-4/5 xl:w-full'>
            <MultiSearch />
          </div>
          <div className='absolute h-40 md:rounded-md w-full top-0 left-0 bg-slate-600 opacity-5 -z-10' />
            <div className='absolute h-36 md:rounded-md w-full top-0 left-0 bg-slate-700 opacity-10 -z-10' />
            <div className='absolute h-32 md:rounded-md w-full top-0 left-0 bg-slate-800 opacity-20 -z-10' />
            <div className='absolute h-28 md:rounded-md w-full top-0 left-0 bg-slate-900 opacity-25 -z-10' />
            <div className='absolute h-24 md:rounded-md w-full top-0 left-0 bg-slate-900 opacity-30 -z-10' />
            <div className='absolute h-20 md:rounded-md w-full top-0 left-0 bg-slate-900 opacity-30 -z-10' />
        </div>

        <div className='mb-12 mt-30 xl:mt-0 xl:mb-10 w-11/12 mx-auto md:w-5/6 lg:w-3/5 xl:w-1/2 pb-10'>
          <div className='hidden xl:flex justify-center items-center xl:border-b-2 gap-x-5 xl:gap-x-10 mb-10 md:mb-16 py-8 xl:py-16 relative'>
            <List size={60} strokeWidth={2} className='text-white' />
            <div className='text-5xl lg:text-6xl text-gray-50 font-medium'>Categories</div>
            <div className='absolute h-40 md:rounded-md w-full top-0 left-0 bg-slate-600 opacity-5 -z-10' />
            <div className='absolute h-36 md:rounded-md w-full top-0 left-0 bg-slate-700 opacity-10 -z-10' />
            <div className='absolute h-32 md:rounded-md w-full top-0 left-0 bg-slate-800 opacity-20 -z-10' />
            <div className='absolute h-28 md:rounded-md w-full top-0 left-0 bg-slate-900 opacity-25 -z-10' />
            <div className='absolute h-24 md:rounded-md w-full top-0 left-0 bg-slate-900 opacity-30 -z-10' />
            <div className='absolute h-20 md:rounded-md w-full top-0 left-0 bg-slate-900 opacity-30 -z-10' />
          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-x-4 lg:gap-x-8 gap-y-4'>
            {categories.map((category) => {
              return <CategoryButton category={category} key={category.id} />;
            })}
          </div>
        </div>
      </div>

      <div className='mt-28 lg:my-32'>
        <IndexFloatingFeed />
      </div>

      <div className='w-11/12 xl:w-4/5 2xl:w-3/4 mx-auto mb-20'>
        <span className='block text-gray-50 text-center mb-10 text-5xl pt-16'>Trending this week</span>
        <div className='lg:flex justify-around items-center'>
          <div className='md:w-4/5 mx-auto lg:w-1/2 xl:w-1/2 2xl:w-2/5 mt-10 lg:mt-0'>
            <TrendingBook book={trending.book} />
          </div>
          <div className='md:w-4/5 mx-auto lg:w-1/3 xl:w-2/5 mt-10 lg:mt-0'>
            <TrendingUser user={trending.user} />
          </div>
        </div>
        <div className='md:w-4/5 md:mx-auto mt-10 lg:mt-20 lg:w-3/5 2xl:w-1/2'>
          <TrendingEntry entry={trending.insight} userId={userState.user.id} />
        </div>
      </div>

      {userState.isLogged ? null : (
        <div className='mx-auto md:w-4/5 lg:w-3/5 mt-5 my-10'>
          <Link href='/about'>
            <div className='underline text-center mx-auto w-4/5 cursor-pointer text-white'>
              Wyse what? Click here to know more!
            </div>
          </Link>
        </div>
      )}

      <div className='absolute h-72 w-5/6 lg:w-11/12 bg-slate-700 opacity-50 -bottom-20 left-0 -z-10 rounded-tr-full' />
      <div className='absolute h-40 w-full lg:w-1/2 bg-slate-700 opacity-70 -bottom-20 right-50 -z-10 rounded-tl-full rounded-tr-full' />
      <div className='absolute h-96 w-4/5 lg:w-9/12 bg-slate-700 opacity-50 -bottom-20 right-0 -z-10 rounded-tl-full' />
      <div className='absolute h-96 w-4/5 lg:w-2/5 bg-slate-400 opacity-90 lg:opacity-75 -bottom-20 left-0 -z-10 rounded-tr-full' />
      <div className='absolute h-48 w-2/5 lg:w-1/5 bg-slate-700 opacity-90 lg:opacity-75 -bottom-20 left-0 -z-10 rounded-tr-full' />
    </div>
  );
};

export default Home;
