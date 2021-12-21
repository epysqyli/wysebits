import Link from "next/dist/client/link";
import { PlusCircle } from "react-feather";

export default () => {
  return (
    <Link href="/users/book-tiles/create/create-book">
      <div className="group cursor-pointer py-4 text-center transition border-t-4 border-gray-50 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 fixed bottom-0 left-0 w-screen animate-show-up z-10">
        <div className="flex justify-center items-center gap-x-4">
          <div className="text-sm font-medium">
            No results? Add your book now!
          </div>
          <div className="group-active:scale-125 transition-transform">
            <PlusCircle strokeWidth={1.5} color="gray" />
          </div>
        </div>
      </div>
    </Link>
  );
};
