import Link from "next/link";

const Homepage = ({ userState }) => {
  if (userState.isLogged) {
    return (
      <div className="v-4/5 mx-auto mt-20">
        <div className="text-3xl text-center">
          Welcome back, {userState.user.username}
        </div>
      </div>
    );
  } else {
    return (
      <div className="v-4/5 mx-auto mt-20">
        <Link href="/registrations/login">
          <a className="block text-3xl text-center border rounded-lg w-3/5 mx-auto py-10 my-10 cursor-pointer shadow-md hover:shadow-lg active:bg-gray-100">
            Login back again
          </a>
        </Link>

        <Link href="/">
          <a className="block text-3xl text-center border rounded-lg w-3/5 mx-auto py-10 my-10 cursor-pointer shadow-md hover:shadow-lg active:bg-gray-100">
            Keep exploring as a guest
          </a>
        </Link>
      </div>
    );
  }
};

export default Homepage;
