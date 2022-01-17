import { capitalize } from "../../../lib/utils";
import { getAuthor } from "../../../lib/serverSideMethods";
import BookCard from "../../../components/books/BookCard";

export const getServerSideProps = async (context) => {
  const slug = context.query.slug;
  const splitSlug = context.query.slug.split("-");
  const authorName = splitSlug
    .slice(0, splitSlug.length - 1)
    .map((str) => capitalize(str))
    .join(" ");
  const id = splitSlug[splitSlug.length - 1];
  const pageNum = context.query.page;

  const author = await getAuthor(id, pageNum);

  return {
    props: {
      books: author.data.books,
      pagy: author.data.pagy,
      authorName: authorName,
    },
  };
};

const Author = ({ books, pagy, authorName }) => {
  return (
    <div>
      <div className="bg-author bg-cover bg-center shadow">
        <div className="bg-gray-800 bg-opacity-70 text-white text-4xl text-center py-16">
          {authorName}
        </div>
      </div>
    </div>
  );
};

export default Author;
