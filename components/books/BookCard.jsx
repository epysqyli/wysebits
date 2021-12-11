import { Image as ImageIcon, Heart } from "react-feather";
import { useState, useEffect } from "react";
import axios from "axios";

const BookCard = ({ bookData }) => {
  const [cover, setCover] = useState(false);

  const imageLoader = (
    <div>
      <ImageIcon className="animate-bounce" />
    </div>
  );

  const olSrc = `https://covers.openlibrary.org/w/olid/${bookData.ol_key}-M.jpg`;
  const dbSrc = bookData.cover_url;

  const coverImage = (
    <img
      className="w-2/6 rounded-md bg-gray-300 object-cover animate-show-up-slow"
      src={dbSrc || olSrc || ""}
    />
  );

  useEffect(() => {
    axios
      .get(`https://covers.openlibrary.org/w/olid/${bookData.ol_key}-M.jpg`)
      .then((resp) => {
        setCover(true);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex justify-center gap-x-5 px-1 py-5">
      {!cover ? imageLoader : coverImage}

      <div className="w-3/6">
        <div className="text-xl text-center mb-5 font-medium">
          {bookData.title}
        </div>
        <div className="text-sm text-center">{bookData.category.name}</div>
        <div className="text-sm text-center italic my-5">
          {bookData.authors[0]
            ? bookData.authors[0].full_name
            : "No authors found"}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
