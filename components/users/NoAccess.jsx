import Link from "next/link";
import { AlertCircle } from "react-feather";

const NoAccess = () => {
  return (
    <div>
      <div className="flex justify-around items-center">
        <AlertCircle
          className="w-1/6"
          size={36}
          strokeWidth={1.5}
          fill="lightgray"
        />
        <div className="w-4/6">
          You have no permission to access this page.
          <br /> Fear not! You have three options:
        </div>
      </div>

      <div className="mt-20">
        <Link href="/registrations/signup">
          <a className="block text-xl text-center border rounded-lg mx-auto py-5 px-10 my-10 cursor-pointer shadow-md bg-white hover:shadow-lg active:bg-gray-100">
            Sign up to start contributing to Wysebits today!
          </a>
        </Link>

        <Link href="/registrations/login">
          <a className="block text-xl text-center border rounded-lg mx-auto py-10 px-2 my-10 cursor-pointer shadow-md bg-white hover:shadow-lg active:bg-gray-100">
            Login if already registered
          </a>
        </Link>

        <Link href="/">
          <a className="block text-xl text-center border rounded-lg mx-auto py-10 px-2 my-10 cursor-pointer shadow-md bg-white hover:shadow-lg active:bg-gray-100">
            Keep exploring as a guest
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NoAccess;
