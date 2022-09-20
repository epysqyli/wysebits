import BookCard from "../../components/books/BookCard";
import Link from "next/link";
import { capitalize, slug } from "../../lib/utils";
import HeaderImage from "../../components/categories/HeaderImage";
import SpecificSearch from "../../components/search/SpecificSearch";
import NoResults from "../../components/search/NoResults";
import ExploreMore from "../../components/navigation/ExploreMore";
import IconAndTitle from "../../components/layout/IconAndTitle";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import IElasticBookResult from "../../interfaces/elastic/IElasticBookResult";
import { ReactElement, useEffect, useState } from "react";
import IElasticRequest from "../../interfaces/elastic/IElasticRequest";
import IElasticBookQuery from "../../interfaces/elastic/IElasticBookQuery";
import { searchBooks } from "../../lib/elastic/search";
import ElasticPagination from "../../components/navigation/ElasticPagination";

interface ServerSideProps extends GetServerSidePropsContext {
  query: {
    slug: string;
    page: string;
    searchTerms?: string;
  };
}

interface PageProps {
  books: Array<IElasticBookResult>;
  categoryName: string;
  categorySlug: string;
  page: string;
  searchTerms?: string;
}

export const getServerSideProps: GetServerSideProps = async (context: ServerSideProps) => {
  const { slug, page } = context.query;
  const categoryName = slug.split("-").join(" ");

  const query: IElasticBookQuery = { "category.slug.keyword": slug };
  const elasticRequest: IElasticRequest = {
    query: {
      term: {
        filter: [query]
      }
    },
    sort: [{ tiles_count: { order: "desc" } }]
  };

  if (context.query.searchTerms) {
    elasticRequest.query.match = {
      must: [{ title: context.query.searchTerms }]
    };
  }

  const elasticResponse = await searchBooks(elasticRequest, page);

  const _props: PageProps = {
    books: elasticResponse.data,
    categoryName: categoryName,
    categorySlug: slug,
    page: page
  };

  if (context.query.searchTerms) _props.searchTerms = context.query.searchTerms;

  return { props: _props };
};

const Category = ({ books, categoryName, categorySlug, page, searchTerms }: PageProps): ReactElement => {
  const [bookResults, setBookResults] = useState<Array<IElasticBookResult>>(books);
  useEffect(() => {
    setBookResults(books);
  }, [books]);
  const clientUrl = `/categories/${categorySlug}`;

  if (books.length !== 0)
    return (
      <div className='pt-10 lg:pt-16'>
        <IconAndTitle title={`${capitalize(categoryName)} Books`} description='' />
        <HeaderImage name={categoryName} slug={categorySlug} />
        <div className='mt-5'>
          <SpecificSearch
            baseUrl='/categories'
            searchContext='category'
            dynamicResource={categorySlug}
            placeholder='search within category'
            searchTerms={searchTerms}
          />
        </div>
        <div className='py-16 pb-20 w-11/12 lg:w-4/5 xl:w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto'>
          {bookResults.map((book) => {
            return (
              <Link
                href={{
                  pathname: "/books/[slug]",
                  query: {
                    slug: `${slug(book._source.title, book._id)}`,
                    page: 1
                  }
                }}
                key={book._id}
              >
                <div className='rounded-md bg-white shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all cursor-pointer active:shadow-inner border-b-2 border-blue-200 hover:border-blue-300'>
                  <BookCard
                    bookData={book._source}
                    showCategoryLink={false}
                    feed={false}
                    showAuthorLink={true}
                    showBookLink={false}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        <ElasticPagination clientUrl={clientUrl} page={page} opts={{ searchTerms: searchTerms }} />
      </div>
    );

  if (books.length === 0 && searchTerms !== "")
    return (
      <div className='pt-10 lg:pt-16'>
        <IconAndTitle title={`${capitalize(categoryName)} Books`} description='' />
        <HeaderImage name={categoryName} slug={categorySlug} />
        <div className='mt-5'>
          <SpecificSearch
            baseUrl='/categories'
            searchContext='category'
            dynamicResource={categorySlug}
            searchTerms={searchTerms}
            placeholder=''
          />
        </div>
        <NoResults />
      </div>
    );

  if (books.length === 0)
    return (
      <div className='pt-10 lg:pt-16'>
        <IconAndTitle title={`${capitalize(categoryName)} Books`} description='' />
        <HeaderImage name={categoryName} slug={categorySlug} />
        <ExploreMore
          message='This category is empty, meaning no books have been assigned to it. Explore books and contribute insights to improve WyseBits.'
          body='You can assign books to specific categories on the same page you write insights, by clicking below the book cover'
          exortation=''
        />
      </div>
    );
};

export default Category;
