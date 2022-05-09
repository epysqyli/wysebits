import Link from "next/dist/client/link";
import { PlusCircle } from "react-feather";

export default () => {
  return (
    <Link href="/users/book-tiles/create/create-book">
      <div className="group cursor-pointer py-4 text-center transition bg-white hover:bg-gray-200 active:bg-gray-300 fixed bottom-0 right-1/2 translate-x-1/2 animate-show-up z-10 w-4/5 md:w-3/5 lg:w-2/5 mb-5 shadow-md rounded-md border-2 border-gray-600">
        <div className="flex justify-center items-center gap-x-4">
          <div className="text-sm font-medium">
            No results? Add your book now!
          </div>
          <PlusCircle strokeWidth={1.5} color="gray" />
        </div>
      </div>
    </Link>
  );
};
