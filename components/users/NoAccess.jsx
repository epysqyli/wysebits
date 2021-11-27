import Link from "next/link";

const NoAccess = () => {
  return (
    <div>
      <div className="w-4/5 mx-auto mt-20">
        <Link href="/registrations/signup">
          <a className="block text-2xl text-center border rounded-lg mx-auto py-10 px-2 my-10 cursor-pointer shadow-md bg-white hover:shadow-lg active:bg-gray-100">
            Sign up to have access to this area
          </a>
        </Link>

        <Link href="/registrations/login">
          <a className="block text-2xl text-center border rounded-lg mx-auto py-10 px-2 my-10 cursor-pointer shadow-md bg-white hover:shadow-lg active:bg-gray-100">
            Login if already registered
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
};

export default NoAccess;
