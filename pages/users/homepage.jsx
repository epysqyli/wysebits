import Link from "next/link";
import Head from "next/head";

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
            Welcome back, {userState.user.username}
          </div>

          <Link href="#">
            <div className="h-36 w-4/5 mx-auto my-20 bg-create-book-tile bg-cover bg-center rounded-md cursor-pointer shadow-md hover:shadow-lg group">
              <div className="bg-gray-800 h-full bg-opacity-70 relative rounded-md group-hover:bg-opacity-75 transition">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="text-white text-2xl font-bold text-center group-hover:scale-110 transition">
                    Create new book tile
                  </div>
                </div>
              </div>
            </div>
          </Link>
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

        <div className="v-4/5 mx-auto mt-20">
          <Link href="/registrations/login">
            <a className="block text-3xl text-center border rounded-lg w-3/5 mx-auto py-10 my-10 cursor-pointer shadow-md bg-white hover:shadow-lg active:bg-gray-100">
              Login back again
            </a>
          </Link>

          <Link href="/">
            <a className="block text-3xl text-center border rounded-lg w-3/5 mx-auto py-10 my-10 cursor-pointer shadow-md bg-white hover:shadow-lg active:bg-gray-100">
              Keep exploring as a guest
            </a>
          </Link>
        </div>
      </div>
    );
  }
};

export default Homepage;
