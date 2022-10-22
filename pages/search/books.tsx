import { useState, useEffect } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import IconAndTitle from "../../components/layout/IconAndTitle";
import { capitalize, slug } from "../../lib/utils";
import BookSearchTile from "../../components/books/BookSearchTile";
import CreateBookBtn from "../../components/users/CreateBookBtn";
import NoSearchResults from "../../components/navigation/NoSearchResults";
import MultiSearch from "../../components/navigation/MultiSearch";
import { searchBooks } from "../../lib/elastic/search";
import IElasticBookResult from "../../interfaces/elastic/IElasticBookResult";
import { AxiosResponse } from "axios";
import ElasticPagination from "../../components/navigation/ElasticPagination";
import IElasticRequest from "../../interfaces/elastic/IElasticRequest";
import IElasticResponse from "../../interfaces/elastic/IElasticResponse";

interface ServerSideProps extends GetServerSidePropsContext {
  query: {
    authorKeywords: string;
    bookKeywords: string;
    page: string;
  };
}

interface Props {
  searchResults: Array<IElasticBookResult>;
  bookKeywords: string;
  authorKeywords: string;
  page: string;
  amount: number;
  perPage: number;
}

export const getServerSideProps: GetServerSideProps = async (context: ServerSideProps) => {
  let searchResults: AxiosResponse<IElasticResponse>;
  const { authorKeywords, bookKeywords, page } = context.query;

  if (authorKeywords !== "" && bookKeywords !== "") {
    const query: IElasticRequest = {
      query: {
        match: {
          must: [
            {
              title: bookKeywords,
              "authors.full_name": authorKeywords
            }
          ]
        }
      },
      sort: []
    };

    searchResults = await searchBooks(query, page);
  } else if (bookKeywords !== "" && authorKeywords == "") {
    const query: IElasticRequest = {
      query: {
        match: {
          must: [
            {
              title: bookKeywords
            }
          ]
        }
      },
      sort: []
    };

    searchResults = await searchBooks(query, page);
  } else if (bookKeywords == "" && authorKeywords !== "") {
    const query: IElasticRequest = {
      query: {
        match: {
          must: [
            {
              "authors.full_name": authorKeywords
            }
          ]
        }
      },
      sort: []
    };

    searchResults = await searchBooks(query, page);
  }

  const _props: Props = {
    searchResults: searchResults.data.results,
    bookKeywords: bookKeywords,
    authorKeywords: authorKeywords,
    page: page,
    amount: searchResults.data.total,
    perPage: searchResults.data.per_page
  };

  return { props: _props };
};

const BookSearchResults = ({ searchResults, bookKeywords, authorKeywords, page, amount, perPage }: Props) => {
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
        <div className='py-16 pb-20 w-11/12 lg:w-4/5 xl:w-11/12 2xl:w-3/4 grid gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3 xl:gap-x-10 mx-auto'>
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

        <ElasticPagination
          page={page}
          clientUrl={clientUrl}
          opts={{ authorKeywords: authorKeywords, bookKeywords: bookKeywords }}
          amountOfResults={amount}
          perPage={perPage}
        />
      </div>
    );
  }

  return <NoSearchResults searchMode='books' bookKeywords={bookKeywords} authorKeywords={authorKeywords} />;
};

export default BookSearchResults;
