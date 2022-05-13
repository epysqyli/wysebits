import { useState, useEffect } from "react";
import IconAndTitle from "../../components/layout/IconAndTitle";
import { capitalize, slug } from "../../lib/utils";
import BookSearchTile from "../../components/books/BookSearchTile";
import Pagination from "../../components/navigation/Pagination";
import CreateBookBtn from "../../components/users/CreateBookBtn";
import NoSearchResults from "../../components/navigation/NoSearchResults";
import {
  searchBooks,
  searchAuthorsBooks,
  searchAuthors,
} from "../../lib/searchMethods";
import MultiSearch from "../../components/navigation/MultiSearch";

export const getServerSideProps = async (context) => {
  let searchResults;
  let authorKeywords = "";
  let bookKeywords;

  if (
    context.query.bookKeywords !== "" &&
    context.query.authorKeywords !== ""
  ) {
    bookKeywords = context.query.bookKeywords;
    authorKeywords = context.query.authorKeywords;
    const page = context.query.page;
    searchResults = await searchAuthorsBooks(
      bookKeywords,
      authorKeywords,
      page
    );
  } else if (
    context.query.bookKeywords !== "" &&
    context.query.authorKeywords == ""
  ) {
    bookKeywords = context.query.bookKeywords;
    const page = context.query.page;
    searchResults = await searchBooks(bookKeywords, page);
  } else if (
    context.query.bookKeywords == "" &&
    context.query.authorKeywords !== ""
  ) {
    authorKeywords = context.query.authorKeywords;
    const page = context.query.page;
    searchResults = await searchAuthors(authorKeywords, page);
  }

  return {
    props: {
      searchResults: searchResults.data.results || null,
      pageNum: searchResults.data.page_num || null,
      pagy: searchResults.data.pagy,
      authorKeywords: authorKeywords || null,
      bookKeywords: bookKeywords || null,
    },
  };
};

const BookSearchResults = ({
  searchResults,
  bookKeywords,
  authorKeywords,
  pagy,
}) => {
  const [btnVisible, setBtnVisible] = useState(false);

  const clientUrl = `/search/books`;

  const showBtn = () => setBtnVisible(true);

  useEffect(() => setTimeout(showBtn, 2000), []);

  if (searchResults.length !== 0) {
    return (
      <div className="pt-10 lg:pt-16">
        <IconAndTitle
          title={`${
            bookKeywords
              ? capitalize(bookKeywords.split("-").join(" "))
              : capitalize(authorKeywords.split("-").join(" "))
          } - Wysebits search`}
        />
        <div className="py-10 w-4/5 mx-auto md:w-4/6 lg:w-3/6 xl:w-2/5">
          <MultiSearch
            bookKeywords={bookKeywords}
            authorKeywords={authorKeywords}
          />
        </div>
        <div className="pt-10 pb-20 w-11/12 lg:w-4/5 xl:w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
          {searchResults.length != 0
            ? searchResults.map((book) => {
                return (
                  <BookSearchTile
                    bookData={book}
                    destPage={`/books/${slug(book.title, book.id)}?page=1`}
                    key={book.id}
                  />
                );
              })
            : null}

          {btnVisible ? <CreateBookBtn /> : null}
        </div>

        <Pagination
          clientUrl={clientUrl}
          pagy={pagy}
          opts={{ authorKeywords: authorKeywords, bookKeywords: bookKeywords }}
        />
      </div>
    );
  }

  return (
    <NoSearchResults
      searchMode="books"
      bookKeywords={bookKeywords}
      authorKeywords={authorKeywords}
    />
  );
};

export default BookSearchResults;
