import { useState } from "react";
import BookCard from "../books/BookCard";

const LatestBooks = ({ books }) => {
  const [latest, setLatest] = useState(books.slice(0, 3));

  return (
    <div className="mx-5 my-10">
      {latest.map((book) => (
        <BookCard bookData={book} key={book.id} />
      ))}
    </div>
  );
};

export default LatestBooks;
