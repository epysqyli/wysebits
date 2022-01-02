import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { Search } from "react-feather";
import {
  findOrCreateHistory,
  addToHistory,
  removeFromHistory,
} from "../../lib/searchHistoryMethods";
import SuggestBox from "./SuggestBox";
import HistoryBox from "./HistoryBox";

const SearchInput = ({ pageDest, placeholder, showSuggest, suggestLink }) => {
  const [searchTerms, setSearchTerms] = useState(null);
  const [searchError, SetSearchError] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [history, setHistory] = useState(null);
  const [didLoad, setDidLoad] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);

  const router = useRouter();

  const searchBooks = () => {
    if (searchTerms && searchTerms.length > 2) {
      addToHistory(searchTerms);
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
    try {
      const newSuggestions = resp.data.results.slice(0, 10);
      setSuggestions(newSuggestions);
    } catch (error) {
      console.log(error);
    }
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

  const removeFromStateHistory = (query) => {
    const newHistory = history.filter((item) => item !== query);
    setHistory(newHistory);
    removeFromHistory(query);
  };

  const recentHistory =
    didLoad && suggestions === null ? (
      <div className="animate-show-up-slow mt-10">
        {history.map((query, index) => {
          return (
            <HistoryBox
              query={query}
              removeFromStateHistory={removeFromStateHistory}
              key={index}
            />
          );
        })}
      </div>
    ) : null;

  useEffect(() => {
    setDidLoad(true);
    setHistory(findOrCreateHistory());
  }, []);

  useEffect(() => {
    if ((searchTerms && searchTerms.length < 3) || searchTerms == "") {
      const newSuggestions = null;
      setSuggestions(newSuggestions);
    }
  }, [searchTerms]);

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
            onFocus={() => setActiveSearch(true)}
            // onBlur={() => setActiveSearch(false)}
            placeholder={placeholder}
            required
          />

          <button
            type="submit"
            className="w-1/6 text-center bg-white border-l rounded-tr-lg rounded-br-lg hover:bg-gray-200 group-hover:shadow-md transition active:text-white"
          >
            <Search
              size={20}
              className="mx-auto"
              onClick={searchBooks}
              color="gray"
            />
          </button>
        </div>

        {activeSearch ? recentHistory : null}

        <div className="text-center text-sm mt-8 text-gray-400">
          {searchError ? (
            <div className="animate-show-up-slow">
              At least 3 characters are needed
            </div>
          ) : null}
        </div>
      </div>

      {showSuggest ? (
        <div>
          <SuggestBox suggestions={suggestions} suggestLink={suggestLink} />
        </div>
      ) : null}
    </div>
  );
};

export default SearchInput;
