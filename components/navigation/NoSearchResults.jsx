import SearchInput from "./SearchInput";
import { AlertCircle, FilePlus } from "react-feather";
import Link from "next/dist/client/link";

const NoSearchResults = () => {
  return (
    <div className="my-10 w-4/5 mx-auto md:w-4/6 lg:w-3/6 xl:w-2/6">
      <SearchInput
        pageDest="/books/search/"
        placeholder="Search for any book"
        showSuggest={true}
        suggestLink="/books/"
        showHistory={true}
      />
      <div className="mt-20 flex justify-around items-center">
        <AlertCircle
          className="w-1/6"
          size={36}
          strokeWidth={1.5}
          fill="lightgray"
        />
        <div className="w-4/6 text-gray-800">
          Unfortunately your search did not produce any meaningful results
        </div>
      </div>

      <Link href="/users/book-tiles/create/create-book">
        <div className="mt-24 flex justify-around items-center bg-white shadow py-5 rounded-md cursor-pointer hover:shadow-md active:shadow-inner">
          <div className="w-4/6 text-gray-800">
            Create a book entry from scratch if you are sure that your book is
            not in our database
          </div>
          <FilePlus
            className="w-1/6"
            size={36}
            strokeWidth={1.5}
            color="gray"
          />
        </div>
      </Link>
    </div>
  );
};

export default NoSearchResults;
