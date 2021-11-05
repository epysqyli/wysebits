import Head from "next/head";
import Button from "../components/Button";
import Slider from "../components/Slider";
import CategoryButton from "../components/CategoryButton";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import Link from "next/link";
import useSWR from "swr";

export const getStaticProps = async () => {
  const resp = await fetch("http://localhost:3001/api/categories");
  const categories = await resp.json();

  return {
    props: {
      categories: categories.data,
    },
  };
};

const Home = ({ categories, loginStatus, userState }) => {
  // client side rendering for top tiles in an otherwise statically served page
  const fetcher = async (url) => {
    const resp = await fetch(url);
    const entries = await resp.json();
    return entries;
  };

  const { data, error } = useSWR(
    "http://localhost:3001/api/top_tiles",
    fetcher
  );

  return (
    <div>
      <Head>
        <title>Wysebits</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-60 mx-auto bg-library bg-cover bg-center mb-20 mt-10">
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

      <form action="" className="mb-20">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search for any book(tiles)"
          className="block mx-auto w-4/6 transition-all duration-200 ease-out hover:w-5/6 focus:w-5/6 rounded-lg focus:ring-gray-700 focus:ring-2 outline-none focus:border-current focus:shadow-lg border-none shadow-md hover:shadow-lg text-center"
        />
      </form>

      {!data ? (
        <div className="mb-20">
          <p className="text-3xl w-4/5 mx-auto text-center mb-5">
            Check trending insights
          </p>
          <div className="flex justify-around items-center border rounded-md shadow-md hover:shadow-lg w-5/6 mx-auto py-5 bg-gray-100">
            <ArrowLeftCircle
              className="text-gray-500 cursor-pointer hover:text-gray-700 active:scale-105"
              size={30}
            />
            <div className="py-20 h-52">Loading ...</div>
            <ArrowRightCircle
              className="text-gray-500 cursor-pointer hover:text-gray-700 active:scale-105"
              size={30}
            />
          </div>
        </div>
      ) : (
        <div className="mb-20">
          <p className="text-3xl w-4/5 mx-auto text-center mb-5">
            Check trending insights
          </p>
          <Slider entries={data.data} />
        </div>
      )}

      {userState.isLogged ? null : (
        <div className="mb-20 w-full bg-gray-200 py-10">
          <Link href="/registrations/signup">
            <a className="block w-4/6 mx-auto">
              <Button text="Join to share your knowledge" />
            </a>
          </Link>
        </div>
      )}

      <div className="mb-20 w-4/5 mx-auto">
        <p className="text-3xl mx-auto text-center mb-10">
          Explore books by categories
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          {categories.map((category) => {
            return <CategoryButton category={category} key={category.id} />;
          })}
        </div>
      </div>

      <div className="pt-10 pb-20 bg-gray-100 shadow">
        <div className="w-4/5 mx-auto">
          <h3 className="text-3xl font-bold mb-5">What is Wysebits?</h3>
          <p className="text-justify">
            Wysebits's vision is that of organizing knowledge contained in
            non-fiction books.
          </p>

          <h4 className="text-xl font-bold mt-5 mb-3">Why should I care?</h4>
          <p className="text-justify">
            Every reader, in the curiosity-driven quest of knowledge building,
            has time and again encountered the annoying feeling of putting a
            book down without being able to easily recollect what the best
            takeways from the book were. You know that a couple of ideas in
            there were just great, and should never be forgotten. Yet they
            somehow fade away. No one likes that.
            <br />
            <span className="italic">
              Wysebits is my answer to this particular problem.
            </span>
          </p>

          <h4 className="text-xl font-bold mt-5 mb-3">What does it mean?</h4>
          <p className="text-justify">
            Wysebits is a collaborative effort at knowledge distillation. This
            means that those 2-3 incredibly great ideas found in a particular
            book now have a real chance to survive in the long term.
          </p>

          <h4 className="text-xl font-bold mt-5 mb-3">How does it work?</h4>
          <p className="text-justify">
            Read a non-fiction book. Post up to 3 ideas from the book that you
            consider important. Users can upvote and downvote each other's
            ideas, in order to allow for bottom-up knowledge discovery. This
            will allow, in due time, the emergence of the "best" idea from any
            given book.
          </p>

          <h4 className="text-xl font-bold mt-5 mb-3">
            How is it different from other websites?
          </h4>
          <p className="text-justify">
            This is not a place for quotes collections, book summaries, reviews,
            reading suggestions or the like. This is a place for the no-frills
            organization of knowledge, straight from the community.
          </p>
        </div>
      </div>

      <div className="h-60 mx-auto bg-bottom-home bg-cover bg-center">
        <div className="bg-gray-800 h-full bg-opacity-80 relative">
          {userState.isLogged ? (
            <div className="w-4/6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="text-3xl font-bold text-gray-200 text-center">
                Wbits.
              </div>
            </div>
          ) : (
            <div className="w-4/6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link href="/registrations/signup">
                <a>
                  <Button text="Join the community!" />
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
