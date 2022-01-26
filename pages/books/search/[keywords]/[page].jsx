import axios from "axios";
import { useState, useEffect } from "react";
import { slug } from "../../../../lib/utils";
import BookSearchTile from "../../../../components/books/BookSearchTile";
import PageNavButton from "../../../../components/navigation/PageNavButton";
import SearchInput from "../../../../components/navigation/SearchInput";
import CreateBookBtn from "../../../../components/users/CreateBookBtn";
import NoSearchResults from "../../../../components/navigation/NoSearchResults";

export const getServerSideProps = async (context) => {
  const keywords = context.query.keywords;
  const splitKeywords = context.query.keywords.split("-").join(" ");
  const pageNum = context.query.page;

  const searchResults = await axios({
    method: "post",
    data: { keywords: JSON.stringify(splitKeywords) },
    url: `http://localhost:3001/api/search/books?page=${pageNum}`,
  });

  return {
    props: {
      searchResults: searchResults.data.results || null,
      pageNum: searchResults.data.page_num || null,
      keywords: keywords,
      pagy: searchResults.data.pagy,
    },
  };
};

const BookSearchResults = ({ searchResults, keywords, pagy }) => {
  const [btnVisible, setBtnVisible] = useState(false);

  const clientUrl = `/books/search/${keywords}`;

  const showBtn = () => setBtnVisible(true);

  useEffect(() => setTimeout(showBtn, 2000), []);

  if (searchResults !== null) {
    return (
      <div>
        <div className="my-10 w-4/5 mx-auto md:w-4/6 lg:w-3/6 xl:w-2/6">
          <SearchInput
            pageDest="/books/search/"
            placeholder="Search for any book"
            searchMode="books"
          />
        </div>
        <div className="mt-10 w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
          {searchResults.length != 0
            ? searchResults.map((book) => {
                return (
                  <BookSearchTile
                    bookData={book}
                    destPage={`/books/${slug(book.title, book.id)}/1`}
                    key={book.id}
                  />
                );
              })
            : null}

          {btnVisible ? <CreateBookBtn /> : null}
        </div>

        <div className="flex items-center py-16 lg:py-32 w-4/5 md:w-2/6 mx-auto gap-x-4 md:gap-x-20">
          <div className="w-1/2">
            <PageNavButton
              direction="left"
              url={pagy.prev_url}
              clientUrl={clientUrl}
            />
          </div>
          <div className="w-1/2">
            <PageNavButton
              direction="right"
              url={pagy.next_url}
              clientUrl={clientUrl}
            />
          </div>
        </div>
      </div>
    );
  }

  if (searchResults === null) {
    return <NoSearchResults searchMode="books" />;
  }
};

export default BookSearchResults;
