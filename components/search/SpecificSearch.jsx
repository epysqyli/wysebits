import { useState } from "react";
import { X, Search } from "react-feather";
import { useRouter } from "next/dist/client/router";

const SpecificSearch = ({
  placeholder,
  baseUrl,
  searchContext,
  dynamicValue,
}) => {
  const [searchTerms, setSearchTerms] = useState("");
  const [clearable, setClearable] = useState(false);

  const router = useRouter();

  const search = async () => {
    router.push({
      pathname: `${baseUrl}/[${searchContext}]`,
      query: {
        [searchContext]: dynamicValue,
        page: 1,
        searchTerms: searchTerms,
      },
    });
  };

  const clearSearch = async () => {
    setClearable(false);
    setSearchTerms("");
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") search();
  };

  const handleChange = async (e) => {
    const newSearchTerms = e.target.value;
    setSearchTerms(newSearchTerms);
  };

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
        value={searchTerms ?? ""}
        onChange={handleChange}
        placeholder={placeholder}
        required
      />
      {clearable ? (
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
