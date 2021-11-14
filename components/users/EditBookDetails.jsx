import { useState } from "react";

const EditBookDetails = ({ booKData, categories }) => {
  const [book, setBook] = useState({
    title: "",
    categoryId: "",
    author: "",
  });

  return (
    <div className="absolute top-1/8 left-1/2 bg-white p-3 -translate-x-1/2 w-11/12 rounded-md animate-show-up">
      <div className="text-center">
        Edit book infos and make wysebits a better place for all!
      </div>
      <form></form>
      <button
        type="submit"
        className="w-3/5 mx-auto block mt-10 mb-5 py-2 bg-gray-100 rounded-md hover:shadow-md hover:bg-gray-200 active:bg-gray-300 active:shadow-md"
      >
        Edit book details
      </button>
    </div>
  );
};

export default EditBookDetails;
