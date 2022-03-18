import { useState } from "react";
import { Loader, X, Search, Underline } from "react-feather";
import { searchWithinCategory } from "../../lib/searchMethods";
import { getCategoryBooks } from "../../lib/serverSideMethods";
import slugify from "slugify";
import { useRouter } from "next/dist/client/router";

const SpecificSearch = ({
  categorySlug,
  placeholder,
  setResults,
  url,
  setUrl,
  setTmpPagy,
}) => {
  const [loading, setLoading] = useState(false);
  const [searchTerms, setSearchTerms] = useState("");
  const [clearable, setClearable] = useState(false);

  const router = useRouter();

  const search = async () => {
    setLoading(true);
    const resp = await searchWithinCategory(categorySlug, searchTerms);
    setResults(resp.data.results);
    setUrl(composeSearchUrl());
    setLoading(false);
    setClearable(true);
    // router.push("/categories/[category]/1", `${composeSearchUrl()}/1`);
  };

  const clearSearch = async () => {
    setLoading(true);
    const books = await getCategoryBooks(categorySlug);
    setResults(books.data.books);
    setLoading(false);
    setClearable(false);
    setSearchTerms("");
    setUrl(`/categories/${categorySlug}`);
    setTmpPagy(books.data.pagy);
  };

  const composeSearchUrl = () => {
    const terms = slugify(searchTerms, { lower: true, strict: true });
    return `${url}|q=${terms}=q|`;
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
        {loading === true ? (
          <Loader size={26} color="white" className="mx-auto animate-spin" />
        ) : (
          <Search
            size={26}
            className="mx-auto"
            onClick={() => search()}
            color="white"
          />
        )}
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
