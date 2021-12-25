import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Search } from "react-feather";
import SuggestBox from "./SuggestBox";

const SearchInput = ({ pageDest, placeholder }) => {
  const [searchTerms, setSearchTerms] = useState(null);
  const [searchError, SetSearchError] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  // const [showSuggestBox, setShowSuggestBox] = useState(true);

  const router = useRouter();

  const searchBooks = () => {
    if (searchTerms && searchTerms.length > 2) {
      router.push({
        pathname: `${pageDest}${getQuery()}/1`,
      });
    } else {
      SetSearchError(true);
    }
  };

  const getSuggestions = async (query) => {
    const resp = await axios({
      method: "post",
      data: { keywords: JSON.stringify(query), page_num: "1" },
      url: "http://localhost:3001/api/search/books",
    });

    // avoid UI conflict with search error message
    SetSearchError(false);

    const newSuggestions = resp.data.results.slice(0, 10);
    setSuggestions(newSuggestions);
  };

  const handleChange = (e) => {
    const newSearchTerms = e.target.value;
    setSearchTerms(newSearchTerms);

    if (newSearchTerms.length > 2) getSuggestions(newSearchTerms);
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      searchBooks();
    }
  };

  const getQuery = () => {
    return searchTerms.split(" ").join("-");
  };

  return (
    <div>
      <div>
        <div
          className="flex group rounded-md shadow-md"
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
            <Search
              size={20}
              className="mx-auto"
              onClick={searchBooks}
              color="gray"
            />
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

      <div>
        <SuggestBox suggestions={suggestions} />
      </div>
    </div>
  );
};

export default SearchInput;
