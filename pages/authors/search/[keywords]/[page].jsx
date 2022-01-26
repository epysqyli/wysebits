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

  if (searchResults !== null)
    return (
      <div>
        <div className="my-10 w-4/5 mx-auto md:w-4/6 lg:w-3/6 xl:w-2/6">
          <SearchInput
            pageDest="/authors/search/"
            placeholder="Search for any author"
            searchMode="authors"
          />
        </div>

        <div className="mt-10 w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
          {searchResults.map((author) => {
            return <AuthorResult author={author} key={author.id} />;
          })}
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

  return <NoSearchResults searchMode="authors" />;
};

export default AuthorSearch;
