import { Heart } from "react-feather";
import BookCard from "./BookCard";
import axios from "axios";
import { useState, useEffect } from "react";

const CardBcg = ({ bookData, userId, favBooks }) => {
  const [favs, setFavs] = useState(favBooks);
  const [isFav, setIsFav] = useState(
    favs != null ? favs.some((book) => bookData.id == book.id) : false
  );

  const bcgImage = () => {
    const olSrc = `https://covers.openlibrary.org/w/olid/${bookData.ol_key}-M.jpg`;
    const dbSrc = bookData.cover_url;
    return dbSrc === null ? olSrc : dbSrc;
  };

  const removeFromFavBooks = () => {
    axios
      .delete(
        `http://localhost:3001/api/users/${userId}/fav_books/${bookData.id}`,
        { withCredentials: true }
      )
      .then((resp) => updateFavs(resp.data.fav_books))
      .catch((err) => console.log(err));
  };

  const addToFavBooks = () => {
    axios
      .post(
        `http://localhost:3001/api/users/${userId}/fav_books/${bookData.id}`,
        {},
        { withCredentials: true }
      )
      .then((resp) => updateFavs(resp.data.fav_books))
      .catch((err) => console.log(err));
  };

  const updateFavs = (newFavBooks) => setFavs(newFavBooks);

  const updateIsFav = () => {
    if (favs != null) setIsFav(favs.some((book) => bookData.id == book.id));
  };

  useEffect(() => updateIsFav(), [favs]);

  return (
    <div className="relative py-5">
      <img
        src={bcgImage()}
        className="absolute top-0 left-1/2 -translate-x-1/2 blur-sm backdrop-brightness-50 grayscale-50 contrast-50 max-h-full w-full object-cover"
      />

      <div className="w-4/5 mx-auto shadow-md backdrop-blur-md backdrop-brightness-75 text-white rounded-md relative z-10">
        <BookCard bookData={bookData} />
      </div>

      <div
        className="w-4/5 mx-auto shadow-md backdrop-blur-md backdrop-brightness-75 text-white rounded-md relative z-10 py-2 my-5 flex items-center justify-center gap-x-4 cursor-pointer  hover:backdrop-brightness-50 active:scale-105 transition-transform"
        onClick={isFav ? removeFromFavBooks : addToFavBooks}
      >
        {isFav ? <div>Remove from favorites</div> : <div>Add to favorites</div>}
        <Heart strokeWidth={1.5} size={20} />
      </div>
    </div>
  );
};

export default CardBcg;
