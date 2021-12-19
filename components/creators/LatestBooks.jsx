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
      <div className="text-center text-gray-800 text-3xl">Latest books</div>
      <div className="mx-5 my-10">
        {latest.map((book) => (
          <Link href={`/books/${slug(book.title, book.id)}/1`} key={book.id}>
            <div className="cursor-pointer shadow-md rounded my-5 bg-gray-100 mx-10 hover:bg-gray-200 active:bg-gray-300 transition-colors">
              <BookCard bookData={book} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestBooks;
