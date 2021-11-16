import axios from "axios";
import BookResult from "../../../components/BookResult";

export const getServerSideProps = async (context) => {
  const keywords = context.query.keywords.split("-").join(" ");

  const searchResults = await axios({
    method: "post",
    data: { keywords: JSON.stringify(keywords) },
    url: "http://localhost:3001/api/search/books",
    headers: { cookie: context.req.headers.cookie },
  });

  return {
    props: {
      searchResults: searchResults.data,
    },
  };
};

const BookSearchResults = ({ searchResults }) => {
  return (
    <div className="w-4/5 mx-auto my-16">
      {searchResults.length != 0
        ? searchResults.map((book) => {
            return <BookResult bookData={book} key={book._id} />;
          })
        : null}
    </div>
  );
};

export default BookSearchResults;
