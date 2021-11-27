import Head from "next/head";
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
    <div className="animate-show-up">
      <Head>
        <title>Wysebits</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-60 mx-auto bg-library bg-cover bg-center mb-20">
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

      <div className="mb-20 w-4/5 mx-auto">
        <SearchInput
          pageDest="/books/search/"
          placeholder="Search for any book"
        />
      </div>

      <div className="mb-10 w-4/5 mx-auto">
        <p className="text-3xl mx-auto text-center mb-10">Explore categories</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          {categories.map((category) => {
            return <CategoryButton category={category} key={category.id} />;
          })}
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
