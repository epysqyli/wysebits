import Head from "next/head";
import { capitalize } from "../../lib/utils";
import { searchAuthors } from "../../lib/searchMethods";
import AuthorResult from "../../components/authors/AuthorResult";
import Pagination from "../../components/navigation/Pagination";
import NoSearchResults from "../../components/navigation/NoSearchResults";
import MultiSearch from "../../components/navigation/MultiSearch";

export const getServerSideProps = async (context) => {
  const authorKeywords = context.query.authorKeywords;
  const pageNum = context.query.page;

  const searchResults = await searchAuthors(authorKeywords, pageNum);

  return {
    props: {
      searchResults: searchResults.data.results || null,
      pageNum: searchResults.data.page_num || null,
      authorKeywords: authorKeywords,
      pagy: searchResults.data.pagy,
    },
  };
};

const AuthorSearch = ({ searchResults, authorKeywords, pagy }) => {
  const clientUrl = `/search/authors`;

  if (searchResults.length !== 0)
    return (
      <div className="pt-10 lg:pt-16">
        <Head>
          <title>
            {capitalize(authorKeywords.split("-").join(" "))} - Wysebits search
          </title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <div className="py-10 w-4/5 mx-auto md:w-4/6 lg:w-3/6 xl:w-2/6">
          <MultiSearch authorKeywords={authorKeywords} />
        </div>

        <div className="py-10 w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
          {searchResults.map((author) => {
            return <AuthorResult author={author} key={author.id} />;
          })}
        </div>

        <Pagination
          clientUrl={clientUrl}
          pagy={pagy}
          opts={{ authorKeywords: authorKeywords }}
        />
      </div>
    );

  return (
    <div className="pt-10 lg:pt-16">
      <NoSearchResults searchMode="authors" />
    </div>
  );
};

export default AuthorSearch;
