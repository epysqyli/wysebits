import { searchAuthors } from "../../../../lib/serverSideMethods";
import AuthorResult from "../../../../components/authors/AuthorResult";
import PageNavButton from "../../../../components/navigation/PageNavButton";
import NoSearchResults from "../../../../components/navigation/NoSearchResults";
import SearchInput from "../../../../components/navigation/SearchInput";

export const getServerSideProps = async (context) => {
  const keywords = context.query.keywords;
  const splitKeywords = context.query.keywords.split("-").join(" ");
  const pageNum = context.query.page;

  const searchResults = await searchAuthors(splitKeywords, pageNum);

  return {
    props: {
      searchResults: searchResults.data.results || null,
      pageNum: searchResults.data.page_num || null,
      keywords: keywords,
      pagy: searchResults.data.pagy,
    },
  };
};

const AuthorSearch = ({ searchResults, keywords, pagy }) => {
  const clientUrl = `/authors/search/${keywords}`;

  if (searchResults.length !== 0)
    return (
      <div className="pb-52 md:pb-60 lg:pb-72 bg-gradient-to-br from-blue-50 via-gray-100 to-gray-200">
        <div className="py-10 w-4/5 mx-auto md:w-4/6 lg:w-3/6 xl:w-2/6">
          <SearchInput
            pageDest="/authors/search/"
            placeholder="Search for any author"
            searchMode="authors"
          />
        </div>

        <div className="py-10 w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
          {searchResults.map((author) => {
            return <AuthorResult author={author} key={author.id} />;
          })}
        </div>

        {pagy.prev === null && pagy.next === null ? null : (
          <div className="flex justify-around pt-16 md:w-4/5 lg:w-1/2 mx-auto">
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

  return (
    <div className="pb-52 md:pb-60 lg:pb-72 2xl:pb-80 bg-gradient-to-br from-blue-50 via-gray-100 to-gray-200">
      <NoSearchResults searchMode="authors" />
    </div>
  );
};

export default AuthorSearch;
