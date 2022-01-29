import BookCard from "./BookCard";
import { slug } from "../../lib/utils";
import Link from "next/dist/client/link";

const Recommendations = ({ recommendations }) => {
  return (
    <>
      {recommendations.map((book) => (
        <Link href={`/books/${slug(book.title, book.id)}/1`} key={book.id}>
          <div className="rounded-md bg-white shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all cursor-pointer active:shadow-inner border-b-2 border-blue-200 hover:border-blue-300">
            <BookCard bookData={book} />
          </div>
        </Link>
      ))}
    </>
  );
};

export default Recommendations;
