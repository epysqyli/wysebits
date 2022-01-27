import BookCard from "./BookCard";
import { slug } from "../../lib/utils";
import Link from "next/dist/client/link";

const Recommendations = ({ recommendations }) => {
  return (
    <>
      {recommendations.map((book) => (
        <Link href={`/books/${slug(book.title, book.id)}/1`} key={book.id}>
          <div className="shadow-md rounded-md cursor-pointer bg-gray-50 hover:bg-gray-200 active:bg-gray-300 active:shadow-inner">
            <BookCard bookData={book} />
          </div>
        </Link>
      ))}
    </>
  );
};

export default Recommendations;
