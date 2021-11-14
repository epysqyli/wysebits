import { useState } from "react";
import axios from "axios";

const EditBookDetails = ({ bookData, categories, hideEditForm }) => {
  const [book, setBook] = useState({
    title: bookData.title,
    categoryId: bookData.category_id,
    author: bookData.authors[0].full_name || null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editDetails();
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // add loader on submit
  const editDetails = () => {
    axios
      .put(
        `http://localhost:3001/api/books/${bookData.id}`,
        {
          title: book.title,
          category_id: book.categoryId,
          author_full_name: book.author,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="absolute top-1/8 left-1/2 bg-white p-3 -translate-x-1/2 w-11/12 rounded-md shadow-lg border-2 border-gray-400 animate-show-up">
      <div className="text-center text-lg border-b-2 pb-2 px-5">
        Edit book infos and make Wysebits a better place for all!
      </div>
      <form onSubmit={handleSubmit}>
        <div className="my-10">
          <label htmlFor="title" className="pl-3">
            Enter the book title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            className="border-none bg-white w-full mt-2 rounded-md focus:ring-0 shadow-sm focus:shadow-md"
            placeholder="Book title"
            defaultValue={bookData.title}
          />
        </div>

        <div className="my-10">
          <label htmlFor="title" className="pl-3">
            Choose a category
          </label>
          <select
            name="categoryId"
            id="category"
            onChange={handleChange}
            className="border-none bg-white w-full mt-2 rounded-md focus:ring-0 shadow-sm"
            defaultValue={bookData.category_id}
          >
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="my-10">
          <label htmlFor="author-full-name" className="pl-3">
            Add the author
          </label>
          <input
            type="text"
            name="author"
            id="author-full-name"
            onChange={handleChange}
            defaultValue={bookData.authors[0].full_name || null}
            className="border-none bg-white w-full mt-2 rounded-md focus:ring-0 shadow-sm focus:shadow-md"
            placeholder="Enter the full name"
          />
        </div>

        <div className="flex justify-between items-center px-2 gap-x-4">
          <div
            className="w-2/5 mx-auto block text-center mt-10 mb-5 py-2 bg-gray-100 rounded-md hover:shadow-md hover:bg-gray-200 active:bg-gray-300 active:shadow-md"
            onClick={() => hideEditForm()}
          >
            Cancel
          </div>
          <button
            type="submit"
            className="w-3/5 mx-auto block mt-10 mb-5 py-2 bg-gray-100 rounded-md hover:shadow-md hover:bg-gray-200 active:bg-gray-300 active:shadow-md"
          >
            Edit book details
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBookDetails;
