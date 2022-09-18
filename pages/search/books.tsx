import { useState, useEffect } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import IconAndTitle from "../../components/layout/IconAndTitle";
import { capitalize, slug } from "../../lib/utils";
import BookSearchTile from "../../components/books/BookSearchTile";
import Pagination from "../../components/navigation/Pagination";
import CreateBookBtn from "../../components/users/CreateBookBtn";
import NoSearchResults from "../../components/navigation/NoSearchResults";
import MultiSearch from "../../components/navigation/MultiSearch";
import IElasticQuery from "../../interfaces/elastic/IElasticQuery";
import { searchBooks } from "../../lib/elastic/search";
import IElasticBookResult from "../../interfaces/elastic/IElasticBookResult";
import { AxiosResponse } from "axios";

interface ServerSideProps extends GetServerSidePropsContext {
  query: {
    authorKeywords: string;
    bookKeywords: string;
    page: string;
  };
}

export const getServerSideProps: GetServerSideProps = async (context: ServerSideProps) => {
  let searchResults: AxiosResponse<Array<IElasticBookResult>>;
  const { authorKeywords, bookKeywords, page } = context.query;

  // manage pagination via elasticsearch
  if (authorKeywords !== "" && bookKeywords !== "") {
    const query: IElasticQuery = {
      match: {
        must: [
          {
            title: bookKeywords,
            "authors.full_name": authorKeywords
          }
        ]
      }
    };

    searchResults = await searchBooks(query, page);
  } else if (bookKeywords !== "" && authorKeywords == "") {
    const query: IElasticQuery = {
      match: {
        must: [
          {
            title: bookKeywords
          }
        ]
      }
    };

    searchResults = await searchBooks(query, page);
  } else if (bookKeywords == "" && authorKeywords !== "") {
    const query: IElasticQuery = {
      match: {
        must: [
          {
            "authors.full_name": authorKeywords
          }
        ]
      }
    };

    searchResults = await searchBooks(query, page);
  }

  return {
    props: {
      searchResults: searchResults.data,
      bookKeywords: bookKeywords,
      authorKeywords: authorKeywords,
      page: page
    }
  };
};

interface Props {
  searchResults: Array<IElasticBookResult>;
  bookKeywords: string;
  authorKeywords: string;
  page: string;
}

const BookSearchResults = ({ searchResults, bookKeywords, authorKeywords, page }: Props) => {
  const [btnVisible, setBtnVisible] = useState(false);
  const showBtn = () => setBtnVisible(true);

  const clientUrl = `/search/books`;

  useEffect(() => {
    setTimeout(showBtn, 2000), [];
  });

  if (searchResults.length !== 0) {
    return (
      <div className='pt-10 lg:pt-16'>
        <IconAndTitle
          title={`${
            bookKeywords
              ? capitalize(bookKeywords.split("-").join(" "))
              : capitalize(authorKeywords.split("-").join(" "))
          } - Wysebits search`}
          description=''
        />
        <div className='py-10 w-4/5 mx-auto md:w-4/6 lg:w-3/6 xl:w-2/5'>
          <MultiSearch bookKeywords={bookKeywords} authorKeywords={authorKeywords} />
        </div>
        <div className='pt-10 pb-20 w-11/12 lg:w-4/5 xl:w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto'>
          {searchResults.length != 0
            ? searchResults.map((book) => {
                return (
                  <BookSearchTile
                    bookData={book}
                    destPage={`/books/${slug(book._source.title, book._id)}?page=1`}
                    key={book._id}
                  />
                );
              })
            : null}

          {btnVisible ? <CreateBookBtn /> : null}
        </div>

        {/* <Pagination
          clientUrl={clientUrl}
          pagy={pagy}
          opts={{ authorKeywords: authorKeywords, bookKeywords: bookKeywords }}
        /> */}
      </div>
    );
  }

  return <NoSearchResults searchMode='books' bookKeywords={bookKeywords} authorKeywords={authorKeywords} />;
};

export default BookSearchResults;
