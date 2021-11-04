import axios from "axios";
import { useState, useEffect } from "react";

const BookResult = ({ bookData }) => {
  const [cover, setCover] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://covers.openlibrary.org/w/olid/${bookData._source.ol_key}-M.jpg`
      )
      .then((resp) => {
        setCover(resp.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="border rounded-md shadow-sm my-10 px-5 py-5 cursor-pointer hover:shadow-md transition hover:bg-gray-100">
      <div className="flex justify-between">
        <div className="mr-5 flex flex-col justify-between">
          <div
            className="text-xl mb-2"
            dangerouslySetInnerHTML={{ __html: bookData.highlight.title }}
          ></div>
          <div className="text-sm">{bookData._source.category.name}</div>
          <div className="text-sm italic">
            {bookData._source.authors.length
              ? bookData._source.authors[0].full_name
              : "No authors found"}
          </div>
        </div>

        {!cover ? (
          <div>loading ...</div>
        ) : (
          <img
            className="w-2/6 rounded-md"
            src={`https://covers.openlibrary.org/w/olid/${bookData._source.ol_key}-M.jpg`}
          />
        )}
      </div>
    </div>
  );
};

export default BookResult;
