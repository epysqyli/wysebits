import { useState } from "react";
import axios from "axios";
import { Loader } from "react-feather";
import { useRouter } from "next/dist/client/router";

const EditBookDetails = ({ bookData, categories, hideEditForm }) => {
  const [book, setBook] = useState({
    title: bookData.title,
    categoryId: bookData.category_id,
    author: bookData.authors.length != 0 ? bookData.authors[0].full_name : null,
  });

  const [file, setFile] = useState(null);

  const [visibleLoader, setVisibleLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    editDetails();
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const router = useRouter();
  const makeSlug = (string) => string.split(" ").join("-").toLowerCase();

  const editDetails = () => {
    setVisibleLoader(true);

    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("category_id", book.categoryId);
    formData.append("author_full_name", book.author);
    if (file) formData.append("book_cover", file);

    axios
      .put(`http://localhost:3001/api/books/${bookData.id}`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setVisibleLoader(false);
        hideEditForm();
        router.push({
          pathname: "/users/book-tiles/create/[id]",
          query: { id: bookData.id },
          asPath: makeSlug(bookData.title),
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="absolute z-30 bg-white pt-10 px-3 w-full h-screen shadow-lg border-gray-400 animate-show-up">
      <div className="mx-auto md:w-4/6">
        <div className="text-center text-lg border-b-2 pb-2 px-5">
          Make WyseBits a better place for the community!
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
              className="border-none bg-white w-full mt-2 rounded-md focus:ring-0 shadow focus:shadow-md"
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
              className="border-none bg-white w-full mt-2 rounded-md focus:ring-0 shadow"
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
              Edit author
            </label>
            <input
              type="text"
              name="author"
              id="author-full-name"
              onChange={handleChange}
              defaultValue={
                bookData.authors.length != 0
                  ? bookData.authors[0].full_name
                  : null
              }
              className="border-none bg-white w-full mt-2 rounded-md focus:ring-0 shadow focus:shadow-md"
              placeholder="Enter the full name"
            />
          </div>

          <div className="my-10 rounded shadow">
            <label htmlFor="book-cover" className="mx-2 px-1">
              Book cover
            </label>
            <input
              type="file"
              name="book_cover"
              id="book-cover"
              onChange={(e) => setFile(e.target.files[0])}
              className="bg-white py-2 w-min px-3"
            />
          </div>

          <div className="flex justify-between items-center px-2 gap-x-4">
            <div
              className="w-2/5 mx-auto block text-center mt-10 mb-5 py-2 bg-gray-100 cursor-pointer rounded-md hover:shadow-md hover:bg-gray-200 active:bg-gray-300 active:shadow-md"
              onClick={() => hideEditForm()}
            >
              Cancel
            </div>
            {visibleLoader ? (
              <div className="w-3/5 mx-auto block mt-10 mb-5 py-2 bg-gray-100">
                <div className="animate-spin block w-min mx-auto">
                  <Loader />
                </div>
              </div>
            ) : (
              <button
                type="submit"
                className="w-3/5 mx-auto block mt-10 mb-5 py-2 bg-gray-100 rounded-md hover:shadow-md hover:bg-gray-200 active:bg-gray-300 active:shadow-md"
              >
                Edit book details
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookDetails;
