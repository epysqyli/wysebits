import { useState } from "react";
import BookCard from "../books/BookCard";
import Link from "next/dist/client/link";
import slugify from "slugify";

const LatestBooks = ({ books }) => {
  const [latest, setLatest] = useState(books.slice(0, 3));

  const slug = (title, id) =>
    slugify(`${title}-${id}`, { lower: true, strict: true });

  return (
    <div>
      <div className="text-center mt-10 text-gray-800 text-3xl">
        Latest books
      </div>
      <div className="mx-5 my-10">
        {latest.map((book) => (
          <Link href={`/books/${slug(book.title, book.id)}/1`}>
            <div className="shadow-md rounded my-5 bg-gray-100  mx-10">
              <BookCard bookData={book} key={book.id} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestBooks;
