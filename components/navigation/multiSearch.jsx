import { Search } from "react-feather";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";

const MultiSearch = () => {
  const [searchTerms, setSearchTerms] = useState({
    author_keywords: "",
    book_keywords: "",
  });

  const handleChange = (e) => {
    setSearchTerms({ ...searchTerms, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const search = () => {
    // if (searchTerms.author_keywords && searchTerms.book_keywords) {
    router.push({
      pathname: "/search/books",
      query: {
        bookKeywords: searchTerms.book_keywords,
        authorKeywords: searchTerms.author_keywords,
        page: 1,
      },
    });
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    search();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-x-1">
        <div className="w-4/5">
          <input
            type="text"
            name="book_keywords"
            id="book_keywords"
            className="block w-full rounded border-none py-3 focus:ring-blue-400 focus:ring-2 text-lg"
            placeholder="book title"
            onChange={handleChange}
          />

          <input
            type="text"
            name="author_keywords"
            id="author_keywords"
            className="mt-2 w-full block rounded border-none py-3 focus:ring-blue-400 focus:ring-2 text-lg"
            placeholder="author name"
            onChange={handleChange}
          />
        </div>

        <button className="w-1/5 rounded bg-white">
          <Search size={36} className="mx-auto" color="gray" />
        </button>
      </form>
    </div>
  );
};

export default MultiSearch;
