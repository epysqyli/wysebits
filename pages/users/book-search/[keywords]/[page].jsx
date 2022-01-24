import { useState, useEffect } from "react";
import BookSearchTile from "../../../../components/books/BookSearchTile";
import NoAccess from "../../../../components/users/NoAccess";
import SearchInput from "../../../../components/navigation/SearchInput";
import CreateBookBtn from "../../../../components/users/CreateBookBtn";
import { searchBooks } from "../../../../lib/serverSideMethods";
import NoSearchResults from "../../../../components/navigation/NoSearchResults";
import PageNavButton from "../../../../components/navigation/PageNavButton";

export const getServerSideProps = async (context) => {
  try {
    const keywords = context.query.keywords;
    const splitKeywords = context.query.keywords.split("-").join(" ");
    const pageNum = context.query.page;

    const searchResults = await searchBooks(splitKeywords, context, pageNum);

    return {
      props: {
        searchResults: searchResults.data.results || null,
        pagy: searchResults.data.pagy,
        keywords: keywords,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

const BookSearchResults = ({ searchResults, userState, keywords, pagy }) => {
  const [btnVisible, setBtnVisible] = useState(false);

  const clientUrl = `/users/book-search/${keywords}`;

  const showBtn = () => setBtnVisible(true);

  useEffect(() => setTimeout(showBtn, 2000), []);

  if (userState.isLogged && searchResults !== null) {
    return (
      <div>
        <div className="my-10 w-4/5 mx-auto md:w-4/6 lg:w-3/6 xl:w-2/6">
          <SearchInput
            pageDest="/users/book-search/"
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
                    destPage={`/users/book-tiles/create/${book.id}`}
                    key={book.id}
                  />
                );
              })
            : null}

          {btnVisible ? <CreateBookBtn /> : null}
        </div>

        <div className="flex justify-around my-16 lg:my-32 md:w-4/5 lg:w-1/2 mx-auto">
          <div className="w-1/3">
            <PageNavButton
              btnText="Previous page"
              clientUrl={clientUrl}
              url={pagy.prev_url}
            />
          </div>
          <div className="w-1/3">
            <PageNavButton
              btnText="Next page"
              clientUrl={clientUrl}
              url={pagy.next_url}
            />
          </div>
        </div>
      </div>
    );
  }

  if (userState.isLogged && searchResults === null) {
    return <NoSearchResults />;
  }

  if (userState.isLogged === false) {
    return (
      <div className="mx-auto mt-10 w-4/5 md:w-4/6 lg:w-3/6">
        <NoAccess />
      </div>
    );
  }
};

export default BookSearchResults;
