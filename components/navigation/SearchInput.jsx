import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Search } from "react-feather";

const SearchInput = ({ pageDest, placeholder }) => {
  const [searchTerms, setSearchTerms] = useState(null);
  const [searchError, SetSearchError] = useState(false);

  const router = useRouter();

  const searchBooks = () => {
    if (searchTerms.length > 2) {
      router.push({
        pathname: `${pageDest}${getQuery()}`,
      });
    } else {
      SetSearchError(true);
    }
  };

  const handleChange = (e) => {
    const newSearchTerms = e.target.value;
    setSearchTerms(newSearchTerms);
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      searchBooks();
    }
  };

  const getQuery = () => {
    return searchTerms.split(" ").join("-") + "/1";
  };

  return (
    <div>
      <div>
        <div
          className="flex group rounded-lg shadow-md"
          onKeyPress={handleKeyPress}
        >
          <input
            type="text"
            name="tmp"
            id="tmp"
            className="border-none bg-white w-5/6 rounded-tl-lg rounded-bl-lg focus:ring-0 group-hover:shadow-md transition"
            onChange={handleChange}
            placeholder={placeholder}
            required
          />

          <button
            type="submit"
            className="w-1/6 text-center bg-white border-l rounded-tr-lg rounded-br-lg hover:bg-gray-200 group-hover:shadow-md transition active:bg-gray-400 active:text-white"
          >
            <Search size={20} className="mx-auto" onClick={searchBooks} />
          </button>
        </div>
        <div className="text-center text-sm mt-8 text-gray-400">
          {searchError ? (
            <div className="animate-show-up-slow">
              At least 3 characters are needed
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
