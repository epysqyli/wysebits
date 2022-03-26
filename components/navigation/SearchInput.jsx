import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { Loader, Search } from "react-feather";
import Link from "next/dist/client/link";

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
  const [searchLoading, setSearchLoading] = useState(false);

  const router = useRouter();
  const getQuery = (query) => query.split(" ").join("-");
  const goToResults = (query = searchTerms) =>
    router.push({
      pathname: `${pageDest}[keywords]`,
      query: {
        keywords: `${getQuery(query)}`,
        page: 1,
      },
    });

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
    setSearchLoading(true);
    const resp = await axios({
      method: "post",
      data: { keywords: JSON.stringify(query) },
      url: `${process.env.BASE_URL}/search/${searchMode}`,
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

  const handleChange = async (e) => {
    const newSearchTerms = e.target.value;
    setSearchTerms(newSearchTerms);
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
    <>
      <div>
        <div
          className="flex gap-x-1 group rounded-md shadow-lg bg-white"
          onKeyPress={handleKeyPress}
        >
          <input
            type="text"
            name="tmp"
            id="tmp"
            className="border-none py-3 bg-white w-5/6 rounded-tl-lg rounded-bl-lg focus:ring-blue-400 focus:ring-2 group-hover:shadow-md transition"
            onChange={handleChange}
            onFocus={() => displayHistory()}
            placeholder={placeholder}
            required
          />

          <button
            type="submit"
            className="w-1/6 text-center bg-white border-l rounded-tr-lg rounded-br-lg hover:bg-gray-100 group-hover:shadow-md transition active:text-white"
          >
            {searchLoading === true ? (
              <Loader size={20} color="gray" className="mx-auto animate-spin" />
            ) : (
              <Search
                size={20}
                className="mx-auto"
                onClick={() => search()}
                color="gray"
              />
            )}
          </button>
        </div>

        <div className="text-center text-sm mt-8 text-gray-600">
          {searchError ? (
            <div className="animate-show-up-slow">
              At least 3 characters are needed
            </div>
          ) : null}
        </div>

        {searchMode === "books" ? recentBooksHistory : recentAuthorsHistory}
      </div>

      {showSuggest && suggestions !== null ? (
        suggestions.length > 0 ? (
          <div>
            <SuggestBox
              suggestions={suggestions}
              suggestLink={suggestLink}
              searchMode={searchMode}
            />
          </div>
        ) : (
          <div>
            No results for these terms. Try another words combination or{" "}
            <Link href="/users/book-tiles/create/create-book">
              <span className="underline cursor-pointer">
                add the book you are looking for now if logged
              </span>
            </Link>
          </div>
        )
      ) : null}
    </>
  );
};

export default SearchInput;
