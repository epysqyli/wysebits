import { useState } from "react";
import BookCard from "../books/BookCard";
import Link from "next/dist/client/link";
import slugify from "slugify";

const LatestBooks = ({ books }) => {
  const [latest] = useState(books.slice(0, 4));

  const slug = (title, id) =>
    slugify(`${title}-${id}`, { lower: true, strict: true });

  return (
    <div>
      <div className="text-center text-gray-800 text-3xl">Latest books</div>
      <div className="mt-10 w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 xl:gap-x-10 xl:grid-cols-2 xl:w-4/5 2xl:w-3/5 mx-auto">
        {latest.map((book) => (
          <Link href={`/books/${slug(book.title, book.id)}/1`} key={book.id}>
            <div className="rounded-md bg-gray-50 transition-colors animate-show-up cursor-pointer active:shadow-inner border-2 border-gray-300 hover:border-gray-400">
              <BookCard bookData={book} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestBooks;
