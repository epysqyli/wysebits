import { searchAuthors } from "../../../../lib/serverSideMethods";
import AuthorResult from "../../../../components/authors/AuthorResult";
import NavButtonElastic from "../../../../components/navigation/NavButtonElastic";

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
    },
  };
};

const Author = ({ searchResults, pageNum, keywords }) => {
  const clientUrl = `/authors/search/${keywords}`;

  return (
    <div>
      <div className="mt-10 w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
        {searchResults.map((author) => {
          return <AuthorResult author={author._source} key={author._id} />;
        })}
      </div>
      <div className="flex justify-around my-16 lg:my-32 md:w-4/5 lg:w-1/2 mx-auto">
        <div className="w-1/3">
          <NavButtonElastic
            btnText="Previous page"
            clientUrl={clientUrl}
            pageNum={pageNum - 1}
          />
        </div>
        <div className="w-1/3">
          <NavButtonElastic
            btnText="Next page"
            clientUrl={clientUrl}
            pageNum={pageNum + 1}
          />
        </div>
      </div>
    </div>
  );
};

export default Author;
