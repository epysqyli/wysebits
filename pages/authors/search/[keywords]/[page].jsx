import { searchAuthors } from "../../../../lib/serverSideMethods";
import AuthorResult from "../../../../components/authors/AuthorResult";

export const getServerSideProps = async (context) => {
  const splitKeywords = context.query.keywords.split("-").join(" ");
  const pageNum = context.query.page;

  const searchResults = await searchAuthors(splitKeywords, pageNum);

  return {
    props: {
      searchResults: searchResults.data.results || null,
      pageNum: searchResults.data.page_num || null,
    },
  };
};

const Author = ({ searchResults, pageNum }) => {
  return (
    <div>
      {searchResults.map((author) => {
        return <AuthorResult author={author._source} key={author._id} />;
      })}
    </div>
  );
};

export default Author;
