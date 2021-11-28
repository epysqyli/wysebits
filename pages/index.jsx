import Head from "next/head";
import { Book, Box } from "react-feather";
import Button from "../components/navigation/Button";
import CategoryButton from "../components/navigation/CategoryButton";
import SearchInput from "../components/navigation/SearchInput";
import Link from "next/link";

export const getStaticProps = async () => {
  const resp = await fetch("http://localhost:3001/api/categories");
  const categories = await resp.json();

  return {
    props: {
      categories: categories.data,
    },
  };
};

const Home = ({ categories, userState }) => {
  return (
    <div className="pb-10">
      <Head>
        <title>Wysebits</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-60 mx-auto bg-library bg-cover bg-center mb-10">
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

      <div className="mb-10 w-4/5 mx-auto px-2 py-3 border-b-2">
        <div className="flex justify-center items-center gap-x-5">
          <Book size={36} strokeWidth={1.5} />
          <div className="text-4xl">Explore books</div>
        </div>
        <div className="mt-10 mb-5">
          <SearchInput
            pageDest="/books/search/"
            placeholder="Search for any book"
          />
        </div>
      </div>

      <div className="mb-10 w-4/5 mx-auto border-b-2 pb-10">
        <div className="flex justify-center items-center gap-x-5 mb-10">
          <Box size={36} strokeWidth={1.5} />
          <div className="text-3xl">Explore categories</div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          {categories.map((category) => {
            return <CategoryButton category={category} key={category.id} />;
          })}
        </div>
      </div>

      {userState.isLogged ? null : (
        <div>
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
