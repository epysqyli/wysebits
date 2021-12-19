import { Star, Delete, FilePlus } from "react-feather";
import BookCard from "./BookCard";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/dist/client/link";

const CardBcg = ({ bookData, userState, favBooks }) => {
  const [favs, setFavs] = useState(favBooks);
  const [isFav, setIsFav] = useState(
    favs.some((book) => book.book_id == bookData.id)
  );

  const bcgImage = () => {
    const olSrc = `https://covers.openlibrary.org/w/olid/${bookData.ol_key}-M.jpg`;
    const dbSrc = bookData.cover_url;
    return dbSrc === null ? olSrc : dbSrc;
  };

  const removeFromFavBooks = () => {
    axios
      .delete(
        `http://localhost:3001/api/users/${userState.user.id}/fav_books/${bookData.id}`,
        { withCredentials: true }
      )
      .then((resp) => updateFavs(resp.data.fav_books))
      .catch((err) => console.log(err));
  };

  const addToFavBooks = () => {
    axios
      .post(
        `http://localhost:3001/api/users/${userState.user.id}/fav_books/${bookData.id}`,
        {},
        { withCredentials: true }
      )
      .then((resp) => updateFavs(resp.data.fav_books))
      .catch((err) => console.log(err));
  };

  const updateFavs = (newFavBooks) => setFavs(newFavBooks);

  const updateIsFav = () => {
    setIsFav(favs.some((book) => bookData.id == book.book_id));
  };

  useEffect(() => updateIsFav(), [favs]);

  if (userState.isLogged) {
    return (
      <div className="relative py-5">
        <img
          src={bcgImage()}
          className="absolute top-0 left-1/2 -translate-x-1/2 blur-sm backdrop-brightness-50 grayscale-50 contrast-50 max-h-full w-full object-cover"
        />

        <div className="w-4/5 mx-auto shadow-md backdrop-blur-md backdrop-brightness-75 text-white rounded-md relative z-10">
          <BookCard bookData={bookData} />
        </div>
        <div className="flex">
          <div
            className="w-2/5 mx-auto shadow-md backdrop-blur-md backdrop-brightness-75 text-white rounded-md relative z-10 py-2 mt-5 flex items-center justify-center gap-x-4 cursor-pointer  hover:backdrop-brightness-50 active:scale-105 transition-transform"
            onClick={isFav ? removeFromFavBooks : addToFavBooks}
          >
            {isFav ? (
              <>
                <div className="text-sm">Remove from favorites</div>
                <Delete strokeWidth={1.5} size={20} />
              </>
            ) : (
              <>
                <div className="text-sm">Add to favorites</div>
                <Star strokeWidth={1.5} size={18} />
              </>
            )}
          </div>
          <Link href={`/users/book-tiles/create/${bookData.id}`}>
            <div
              className="w-2/5 mx-auto shadow-md backdrop-blur-md backdrop-brightness-75 text-white rounded-md relative z-10 py-2 mt-5 flex items-center justify-center gap-x-4 cursor-pointer  hover:backdrop-brightness-50 active:scale-105 transition-transform"
              onClick={isFav ? removeFromFavBooks : addToFavBooks}
            >
              <div className="text-sm">Share your insights</div>
              <FilePlus strokeWidth={1.5} size={20} />
            </div>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative py-5">
        <img
          src={bcgImage()}
          className="absolute top-0 left-1/2 -translate-x-1/2 blur-sm backdrop-brightness-50 grayscale-50 contrast-50 max-h-full w-full object-cover"
        />

        <div className="w-4/5 mx-auto shadow-md backdrop-blur-md backdrop-brightness-75 text-white rounded-md relative z-10">
          <BookCard bookData={bookData} />
        </div>
      </div>
    );
  }
};

export default CardBcg;
