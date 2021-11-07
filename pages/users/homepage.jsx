import Link from "next/link";
import Head from "next/head";
import HomepageButton from "../../components/users/HomepageButton";

const Homepage = ({ userState }) => {
  if (userState.isLogged) {
    return (
      <div>
        <Head>
          <title>User Homepage</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="w-4/5 mx-auto mt-20">
          <div className="text-3xl text-center">
            Welcome back, {userState.user.username}. <br /> What are you up to
            today?
          </div>

          <div className="mx-auto my-20">
            <HomepageButton text="Create new book tile" href="/users/book-tiles/book-search" />
          </div>

          <div className="mx-auto my-20">
            <HomepageButton text="Check all of your book tiles" href="#" />
          </div>

          <div className="mx-auto my-20">
            <HomepageButton text="Manage profile" href="#" />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Head>
          <title>User Homepage</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="w-4/5 mx-auto mt-20">
          <Link href="/registrations/login">
            <a className="block text-2xl text-center border rounded-lg mx-auto py-10 px-2 my-10 cursor-pointer shadow-md bg-white hover:shadow-lg active:bg-gray-100">
              Login back again
            </a>
          </Link>

          <Link href="/">
            <a className="block text-2xl text-center border rounded-lg mx-auto py-10 px-2 my-10 cursor-pointer shadow-md bg-white hover:shadow-lg active:bg-gray-100">
              Keep exploring as a guest
            </a>
          </Link>
        </div>
      </div>
    );
  }
};

export default Homepage;
