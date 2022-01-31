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

  if (searchResults.length !== 0) {
    return (
      <div>
        <div className="py-10 w-4/5 mx-auto md:w-4/6 lg:w-3/6 xl:w-2/6">
          <SearchInput
            pageDest="/books/search/"
            placeholder="Search for any book"
            searchMode="books"
          />
        </div>
        <div className="mt-10 w-11/12 lg:w-4/5 xl:w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
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

        {pagy.prev === null && pagy.next === null ? null : (
          <div className="flex justify-around my-16 md:w-4/5 lg:w-1/2 mx-auto">
            <div className="w-1/3">
              <PageNavButton
                direction="left"
                clientUrl={clientUrl}
                url={pagy.prev_url}
              />
            </div>
            <div className="w-1/3">
              <PageNavButton
                direction="right"
                clientUrl={clientUrl}
                url={pagy.next_url}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return <NoSearchResults searchMode="books" />;
};

export default BookSearchResults;
