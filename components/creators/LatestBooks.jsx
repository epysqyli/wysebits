import { useState } from "react";
import BookCard from "../books/BookCard";

const LatestBooks = ({ books }) => {
  const [latest, setLatest] = useState(books.slice(0, 3));

  return (
    <div>
      <div className="text-center mt-10 text-gray-800 text-3xl">
        Latest contributed books
      </div>
      <div className="mx-5 my-10">
        {latest.map((book) => (
          <div className="shadow-md rounded my-5 bg-gray-100  mx-10">
            <BookCard bookData={book} key={book.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBooks;
