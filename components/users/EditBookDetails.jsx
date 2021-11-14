import { useState } from "react";

const EditBookDetails = ({ bookTitle, bookCategoryId, bookAuthor }) => {
  const [book, setBook] = useState({
    title: bookTitle,
    categoryId: bookCategoryId,
    author: bookAuthor,
  });

  return (
    <div className="absolute top-1/8 left-1/2 bg-white border p-3 -translate-x-1/2 w-11/12 shadow-sm rounded-md">
      <div className="text-center">
        Edit book infos and make wysebits a better place for all!
      </div>
      <form></form>
      <button
        type="submit"
        className="w-3/5 mx-auto block border mt-10 mb-5 py-2 bg-gray-100 rounded-md shadow-sm hover:shadow-md hover:bg-gray-200 active:bg-gray-300 active:shadow-lg"
      >
        Edit book details
      </button>
    </div>
  );
};

export default EditBookDetails;
