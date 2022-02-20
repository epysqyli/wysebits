import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "react-feather";
import { useRouter } from "next/dist/client/router";
import { createAuthor, searchAuthors } from "../../lib/editMethods";
import { isCoverValid } from "../../lib/uploadMethods";

const EditBookDetails = ({ bookData, categories, hideEditForm }) => {
  const [book, setBook] = useState({
    title: bookData.title,
    categoryId: bookData.category_id,
    author: {
      full_name:
        bookData.authors.length != 0 ? bookData.authors[0].full_name : "",
      id: bookData.authors.length != 0 ? bookData.authors[0].id : null,
    },
  });

  const [authorSuggestions, setAuthorsSuggestions] = useState(null);
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [fileAllowed, setFileAllowed] = useState(true);

  const handleChange = (e) =>
    setBook({ ...book, [e.target.name]: e.target.value });

  const updateAuthorsSuggestions = async () => {
    const newAuthorsSuggestions = await searchAuthors(book.author.full_name);
    setAuthorsSuggestions(newAuthorsSuggestions.data.results);
  };

  const router = useRouter();
  const makeSlug = (string) => string.split(" ").join("-").toLowerCase();

  const handleAuthorChange = (e) => {
    const newAuthor = {
      [e.target.name]: e.target.value,
      id: null,
    };

    setBook({ ...book, author: newAuthor });
  };

  const assignExistingAuthor = (author) => {
    const newAuthor = {
      full_name: author.full_name,
      id: author.id,
    };

    setBook({ ...book, author: newAuthor });
    cleanAuthorSearchState();
  };

  const cleanAuthorSearchState = () => setAuthorsSuggestions(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    if (isCoverValid(e.target.files[0])) {
      setFileAllowed(true);
    } else {
      setFileAllowed(false);
    }
  };

  const createFormData = (author) => {
    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("category_id", book.categoryId);
    formData.append("author_id", author.id);
    if (file) formData.append("book_cover", file);

    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (book.author.id === null) {
      const author = await createAuthor(book.author.full_name);
      const formData = createFormData(author.data);
      submit(formData);
    }

    const formData = createFormData(book.author);
    submit(formData);
  };

  const submit = (formData) => {
    setLoader(true);

    axios
      .put(`http://localhost:3001/api/books/${bookData.id}`, formData, {
        withCredentials: true,
      })
      .then(() => {
        setLoader(false);
        hideEditForm();
        router.push({
          pathname: "/users/book-tiles/create/[id]",
          query: { id: bookData.id },
          asPath: makeSlug(bookData.title),
        });
      })
      .catch((err) => console.log(err));
  };

  const submitButton = fileAllowed ? (
    <button
      type="submit"
      className="w-3/5 mx-auto block mt-10 mb-5 py-2 bg-white rounded-md hover:shadow-md hover:bg-gray-200 active:bg-gray-300 active:shadow-md"
    >
      Edit book details
    </button>
  ) : (
    <button
      type="submit"
      disabled
      className="w-3/5 mx-auto block mt-10 mb-5 py-2 bg-gray-50 text-gray-400 rounded-md cursor-default"
    >
      Edit book details
    </button>
  );

  useEffect(async () => {
    await updateAuthorsSuggestions();
  }, [book.author.full_name]);

  return (
    <div className="z-30 fixed top-0 bottom-0 w-full overflow-y-scroll bg-gray-100 pt-20 pb-10 px-3 shadow-lg border-gray-400 animate-show-up">
      <div className="mx-auto w-5/6 md:w-4/6 lg:w-1/2 xl:w-1/3">
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

          <div className="mt-10">
            <label htmlFor="author-full-name">
              <div className="pl-3">Edit author</div>
              <div className="mt-1 mb-2 text-sm text-gray-500 pl-3">
                It will be created if not present on the search results
              </div>
            </label>
            <input
              type="text"
              name="full_name"
              id="author-full-name"
              onChange={handleAuthorChange}
              value={book.author.full_name}
              className="border-none bg-white w-full mt-2 rounded-md focus:ring-0 shadow focus:shadow-md"
              placeholder="Enter the full name and select it below if present"
            />
          </div>

          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-1 gap-y-1">
            {authorSuggestions
              ? authorSuggestions.map((author) => {
                  return (
                    <div
                      className="rounded border p-1 text-sm text-gray-700 bg-white cursor-pointer hover:text-black hover:shadow hover:bg-gray-200 active:scale-95"
                      key={author._id}
                      onClick={() => assignExistingAuthor(author)}
                    >
                      {author.full_name}
                    </div>
                  );
                })
              : null}
          </div>

          <div className="mt-10 py-2 bg-white rounded shadow">
            <label htmlFor="book-cover" className="mx-2 px-1">
              Book cover
            </label>
            <input
              type="file"
              name="book_cover"
              id="book-cover"
              className="hidden"
              onChange={handleFileUpload}
              className="bg-white py-2 w-min px-3"
            />
          </div>
          <div
            className={`mt-5 text-center text-sm ${
              fileAllowed ? "" : "border border-red-400 bg-red-100 py-2 rounded"
            }`}
          >
            <p>Max size: 5mb</p>
            <p>Accepted types: jpeg, jpg, png</p>
          </div>

          <div className="flex justify-between items-center px-2 gap-x-4">
            <div
              className="w-2/5 mx-auto block text-center mt-10 mb-5 py-2 bg-white cursor-pointer rounded-md hover:shadow-md hover:bg-gray-200 active:bg-gray-300 active:shadow-md"
              onClick={() => hideEditForm()}
            >
              Cancel
            </div>
            {loader ? (
              <div className="w-3/5 mx-auto block mt-10 mb-5 py-2 bg-gray-100">
                <div className="animate-spin block w-min mx-auto">
                  <Loader />
                </div>
              </div>
            ) : (
              submitButton
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookDetails;
