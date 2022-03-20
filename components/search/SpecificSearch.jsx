import { useEffect, useState } from "react";
import { X, Search } from "react-feather";
import { useRouter } from "next/dist/client/router";

const SpecificSearch = ({
  placeholder,
  baseUrl,
  searchContext,
  dynamicValue,
  currentSearchTerms,
}) => {
  const [searchTerms, setSearchTerms] = useState("");
  const router = useRouter();

  const search = () => {
    if (dynamicValue !== undefined)
      router.push({
        pathname: `${baseUrl}/[${searchContext}]`,
        query: {
          [searchContext]: dynamicValue,
          page: 1,
          searchTerms: searchTerms,
        },
      });
    else
      router.push({
        pathname: baseUrl,
        query: { page: 1, searchTerms: searchTerms },
      });
  };

  const clearSearch = () => {
    setSearchTerms("");
    if (dynamicValue !== undefined)
      router.push({
        pathname: `${baseUrl}/[${searchContext}]`,
        query: {
          [searchContext]: dynamicValue,
          page: 1,
        },
      });
    else
      router.push({
        pathname: baseUrl,
        query: { page: 1 },
      });
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") search();
  };

  const handleChange = async (e) => {
    const newSearchTerms = e.target.value;
    setSearchTerms(newSearchTerms);
  };

  useEffect(() => {
    if (currentSearchTerms) setSearchTerms(currentSearchTerms);
  }, []);

  useEffect(() => {
    if (searchTerms === "") clearSearch();
  }, [searchTerms]);

  return (
    <div
      className="flex justify-center items-center gap-x-5"
      onKeyPress={handleKeyPress}
    >
      <button type="submit" className="">
        <Search
          size={26}
          className="mx-auto"
          onClick={() => search()}
          color="white"
        />
      </button>
      <input
        type="text"
        name="tmp"
        id="tmp"
        className="border-white border-b border-t-0 border-l-0 border-r-0 focus:ring-0 bg-transparent text-white focus:border-white placeholder-white text-center mb-2"
        value={searchTerms}
        onChange={handleChange}
        placeholder={placeholder}
        required
      />
      {searchTerms ? (
        <X
          size={26}
          color="white"
          onClick={clearSearch}
          className="cursor-pointer hover:scale-90 active:scale-75 hover:rotate-180 transition-transform"
        />
      ) : null}
    </div>
  );
};

export default SpecificSearch;
