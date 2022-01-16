export const serverSiderProps = (context) => {
  const keywords = context.keywords.page;
  const splitKeywords = context.query.keywords.split("-").join(" ");
  const pageNum = context.query.page;

  return {
    props: {},
  };
};

const AuthorSearch = () => {
  return <div></div>;
};

export default AuthorSearch;
