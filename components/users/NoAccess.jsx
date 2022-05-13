import IconAndTitle from "../layout/IconAndTitle";
import Link from "next/link";
import { AlertCircle } from "react-feather";

const NoAccess = () => {
  return (
    <div className="w-5/6 md:w-3/5 lg:w-4/6 mx-auto pt-20">
      <IconAndTitle title="No access"/>
      <div className="flex justify-around items-center gap-x-5">
        <AlertCircle
          className="w-1/6"
          size={36}
          strokeWidth={1.5}
          fill="gray"
          color="white"
        />
        <div className="w-5/6 text-gray-50">
          You have no permission to access this page.
          <br /> Fear not! You have three options:
        </div>
      </div>

      <div className="mt-20">
        <Link href="/registrations/signup">
          <a className="block text-lg text-gray-800 text-center rounded-lg mx-auto py-5 px-10 my-10 cursor-pointer shadow-md bg-white hover:shadow-lg active:shadow-inner">
            Sign up to start contributing to Wysebits today!
          </a>
        </Link>

        <Link href="/registrations/login">
          <a className="block text-lg text-gray-800 text-center rounded-lg mx-auto py-10 px-2 my-10 cursor-pointer shadow-md bg-white hover:shadow-lg active:shadow-inner">
            Login if already registered
          </a>
        </Link>

        <Link href="/">
          <a className="block text-lg text-gray-800 text-center rounded-lg mx-auto py-10 px-2 my-10 cursor-pointer shadow-md bg-white hover:shadow-lg active:shadow-inner">
            Keep exploring as a guest
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NoAccess;
