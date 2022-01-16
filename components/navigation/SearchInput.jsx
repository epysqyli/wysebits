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

const SearchInput = ({
  pageDest,
  placeholder,
  searchMode,
  showSuggest,
  suggestLink,
  showHistory,
}) => {
  const [searchTerms, setSearchTerms] = useState("");
  const [searchError, SetSearchError] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [booksHistory, setBooksHistory] = useState(null);
  const [authorsHistory, setAuthorsHistory] = useState(null);
  const [didLoad, setDidLoad] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);

  const router = useRouter();
  const getQuery = (query) => query.split(" ").join("-");
  const goToResults = (query = searchTerms) => {
    router.push(`${pageDest}${getQuery(query)}/1`);
  };

  const updateHistory = (terms) => {
    if (searchMode === "books") addToHistory(terms, "booksHistory");
    if (searchMode === "authors") addToHistory(terms, "authorsHistory");
  };

  const search = (query) => {
    // query coming from history
    if (query !== undefined) {
      goToResults(query);
      return;
    }

    // query coming from state
    if (query === undefined && searchTerms.trim().length > 2) {
      updateHistory(searchTerms);
      goToResults();
    } else {
      SetSearchError(true);
    }
  };

  const getSuggestions = async (query) => {
    const resp = await axios({
      method: "post",
      data: { keywords: JSON.stringify(query), page_num: "1" },
      url: `http://localhost:3001/api/search/${searchMode}`,
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
    if (e.key == "Enter") search();
  };

  const removeFromStateHistory = (query) => {
    if (searchMode === "books") {
      const newHistory = booksHistory.filter((item) => item !== query);
      setBooksHistory(newHistory);
      removeFromHistory(query, "booksHistory");
    }

    if (searchMode === "authors") {
      const newHistory = authorsHistory.filter((item) => item !== query);
      setAuthorsHistory(newHistory);
      removeFromHistory(query, "authorsHistory");
    }
  };

  const displayHistory = () => {
    if (searchMode === "books" && booksHistory.length !== 0)
      setActiveSearch(true);

    if (searchMode === "authors" && authorsHistory.length !== 0)
      setActiveSearch(true);
  };

  // manage history on load
  useEffect(() => {
    setDidLoad(true);
    setBooksHistory(findOrCreateHistory("booksHistory").reverse());
    setAuthorsHistory(findOrCreateHistory("authorsHistory").reverse());
  }, []);

  // ensures safe toggling between search modes
  useEffect(() => setSuggestions(null), [searchMode]);

  useEffect(() => {
    if ((searchTerms && searchTerms.length < 3) || searchTerms == "") {
      const newSuggestions = null;
      setSuggestions(newSuggestions);
    }
  }, [searchTerms]);

  const recentBooksHistory =
    activeSearch &&
    didLoad &&
    suggestions === null &&
    showHistory &&
    booksHistory !== null ? (
      <div className="animate-show-up-slow mt-10">
        {booksHistory.map((query, index) => {
          return (
            <HistoryBox
              query={query}
              removeFromStateHistory={removeFromStateHistory}
              search={search}
              key={index}
            />
          );
        })}
      </div>
    ) : null;

  const recentAuthorsHistory =
    activeSearch &&
    didLoad &&
    suggestions === null &&
    showHistory &&
    authorsHistory !== null ? (
      <div className="animate-show-up-slow mt-10">
        {authorsHistory.map((query, index) => {
          return (
            <HistoryBox
              query={query}
              removeFromStateHistory={removeFromStateHistory}
              search={search}
              key={index}
            />
          );
        })}
      </div>
    ) : null;

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
            onFocus={() => displayHistory()}
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
              onClick={() => search()}
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

        {searchMode === "books" ? recentBooksHistory : recentAuthorsHistory}
      </div>

      {showSuggest ? (
        <div>
          <SuggestBox
            suggestions={suggestions}
            suggestLink={suggestLink}
            searchMode={searchMode}
          />
        </div>
      ) : null}
    </div>
  );
};

export default SearchInput;
