import BookCard from "../../components/books/BookCard";
import Link from "next/link";
import Pagination from "../../components/navigation/Pagination";
import { getCategoryBooks } from "../../lib/serverSideMethods";
import { searchWithinCategory } from "../../lib/searchMethods";
import { capitalize, slug } from "../../lib/utils";
import HeaderImage from "../../components/categories/HeaderImage";
import SpecificSearch from "../../components/search/SpecificSearch";
import NoResults from "../../components/search/NoResults";
import ExploreMore from "../../components/navigation/ExploreMore";
import IconAndTitle from "../../components/layout/IconAndTitle";

export const getServerSideProps = async (context) => {
  const slug = context.params.category;
  const pageNum = context.query.page;
  const categoryName = slug.split("-").join(" ");

  let books;
  if (context.query.searchTerms === undefined) {
    books = await getCategoryBooks(slug, pageNum);
  } else {
    const keywords = context.query.searchTerms;
    books = await searchWithinCategory(slug, keywords, pageNum);
  }

  return {
    props: {
      books: books.data.results,
      pagy: books.data.pagy,
      categoryName: categoryName,
      categorySlug: slug,
      currentSearchTerms: context.query.searchTerms ?? null,
      searchParams: context.query.searchTerms ? { searchTerms: context.query.searchTerms } : null
    }
  };
};

const Category = ({ books, categoryName, categorySlug, pagy, searchParams, currentSearchTerms }) => {
  const clientUrl = `/categories/${categorySlug}`;

  if (books.length !== 0)
    return (
      <div className='pt-10 lg:pt-16'>
        <IconAndTitle title={`${capitalize(categoryName)} Books`} />
        <HeaderImage name={categoryName} slug={categorySlug} />
        <div className='mt-5'>
          <SpecificSearch
            placeholder='search category'
            baseUrl='/categories'
            searchContext='category'
            dynamicValue={categorySlug}
            currentSearchTerms={currentSearchTerms}
          />
        </div>
        <div className='py-16 pb-20 w-11/12 lg:w-4/5 xl:w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto'>
          {books.map((book) => {
            return (
              <Link
                href={{
                  pathname: "/books/[slug]",
                  query: {
                    slug: `${slug(book.title, book.id)}`,
                    page: 1
                  }
                }}
                key={book.id}
              >
                <div className='rounded-md bg-white shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all cursor-pointer active:shadow-inner border-b-2 border-blue-200 hover:border-blue-300'>
                  <BookCard bookData={book} />
                </div>
              </Link>
            );
          })}
        </div>

        <Pagination clientUrl={clientUrl} pagy={pagy} opts={searchParams} />
      </div>
    );

  if (books.length === 0 && currentSearchTerms !== null)
    return (
      <div className='pt-10 lg:pt-16'>
        <IconAndTitle title={`${capitalize(categoryName)} Books`} />
        <HeaderImage name={categoryName} slug={categorySlug} />
        <div className='mt-5'>
          <SpecificSearch
            baseUrl='/categories'
            searchContext='category'
            dynamicValue={categorySlug}
            currentSearchTerms={currentSearchTerms}
          />
        </div>
        <NoResults />
      </div>
    );

  if (books.length === 0)
    return (
      <div className='pt-10 lg:pt-16'>
        <IconAndTitle title={`${capitalize(categoryName)} Books`} />
        <HeaderImage name={categoryName} slug={categorySlug} />
        <ExploreMore
          message='This category is empty, meaning no books have been assigned to it. Explore books and contribute insights to improve WyseBits.'
          body='You can assign books to specific categories on the same page you write insights, by clicking below the book cover'
        />
      </div>
    );
};

export default Category;
