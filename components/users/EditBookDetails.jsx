import { useState } from "react";

const EditBookDetails = ({ bookData, categories }) => {
  const [book, setBook] = useState({
    title: bookData.title,
    categoryId: bookData.category_id,
    author: bookData.authors[0] || null,
  });

  return (
    <div className="absolute top-1/8 left-1/2 bg-white p-3 -translate-x-1/2 w-11/12 rounded-md shadow-lg border-2 border-gray-400 animate-show-up">
      <div className="text-center">
        Edit book infos and make wysebits a better place for all!
      </div>
      <form>
        <div className="my-10">
          <label htmlFor="title" className="pl-3">
            Enter the book title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="border-none bg-white w-full mt-2 rounded-md focus:ring-0 shadow-sm focus:shadow-md"
            placeholder="Book title"
            required
          />
        </div>

        <div className="my-10">
          <label htmlFor="title" className="pl-3">
            Choose a category
          </label>
          <select
            name="category_id"
            id="category"
            className="border-none bg-white w-full mt-2 rounded-md focus:ring-0 shadow-sm"
            defaultValue={bookData.category_id}
            required
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
            name="author_full_name"
            id="author-full-name"
            className="border-none bg-white w-full mt-2 rounded-md focus:ring-0 shadow-sm focus:shadow-md"
            placeholder="Enter the full name"
            required
          />
        </div>
      </form>
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
