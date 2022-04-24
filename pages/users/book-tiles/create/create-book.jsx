import { useState } from "react";
import axios from "axios";
import { Loader, Search } from "react-feather";
import { useRouter } from "next/dist/client/router";
import NoAccess from "../../../../components/users/NoAccess";
import { getCategories } from "../../../../lib/serverSideMethods";
import { createAuthor, searchAuthors } from "../../../../lib/editMethods";
import { isCoverValid } from "../../../../lib/uploadMethods";

export const getServerSideProps = async () => {
  const categories = await getCategories();
  return {
    props: { categories: categories.data },
  };
};

const CreateBook = ({ categories, userState }) => {
  if (userState.isLogged) {
    const [book, setBook] = useState({
      title: "",
      category_id: categories[0].id,
      author: {
        full_name: "",
        id: null,
      },
    });

    const [file, setFile] = useState(null);
    const [authorSuggestions, setAuthorsSuggestions] = useState(null);
    const [loader, setLoader] = useState(false);
    const [authorLoading, setAuthorLoading] = useState(false);
    const [fileAllowed, setFileAllowed] = useState(true);

    const submitButton = fileAllowed ? (
      <button
        type="submit"
        className="w-3/5 mx-auto block mt-10 mb-5 py-2 bg-gray-50 rounded-md hover:shadow hover:bg-gray-100 active:shadow-inner transition-colors"
      >
        Create book
      </button>
    ) : (
      <button
        type="submit"
        disabled
        className="w-3/5 mx-auto block mt-10 mb-5 py-2 bg-gray-50 text-gray-400 rounded-md cursor-default"
      >
        Create book
      </button>
    );

    const router = useRouter();

    const handleChange = (e) => {
      const newFormData = { ...book, [e.target.name]: e.target.value };
      setBook(newFormData);
    };

    const handleFileUpload = (e) => {
      setFile(e.target.files[0]);
      if (isCoverValid(e.target.files[0])) {
        setFileAllowed(true);
      } else {
        setFileAllowed(false);
      }
    };

    const handleAuthorChange = (e) => {
      const newAuthor = {
        [e.target.name]: e.target.value,
        id: null,
      };

      setBook({ ...book, author: newAuthor });
    };

    const updateAuthorsSuggestions = async () => {
      setAuthorLoading(true);
      const newAuthorsSuggestions = await searchAuthors(book.author.full_name);
      setAuthorsSuggestions(newAuthorsSuggestions.data.results);
      setAuthorLoading(false);
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

    const createFormData = (author) => {
      const formData = new FormData();

      formData.append("title", book.title);
      formData.append("category_id", book.category_id);
      formData.append("author_id", author.id);
      if (file) formData.append("book_cover", file);

      return formData;
    };

    const submit = (formData) => {
      setLoader(true);

      axios
        .post(`${process.env.BASE_URL}/books`, formData, {
          withCredentials: true,
        })
        .then((res) => {
          setLoader(false);
          router.push(`/users/book-tiles/create/${res.data.id}`);
        })
        .catch((err) => console.log(err));
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

    return (
      <div className="w-4/5 mx-auto md:w-4/6 lg:w-3/6 my-20 pb-10">
        <div className="text-3xl font-medium text-center text-gray-50">
          Fill in the required fields to add a book
        </div>

        <form
          encType="multipart/form-data"
          className="py-5"
          onSubmit={handleSubmit}
        >
          <div className="my-10">
            <label htmlFor="title" className="pl-3 text-lg text-gray-50">
              Enter the book title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="border-none bg-white w-full mt-2 rounded-md focus:ring-0 shadow-sm focus:shadow-md"
              placeholder="Book title"
              onChange={handleChange}
              required
            />
          </div>

          <div className="my-10">
            <label htmlFor="title" className="pl-3 text-lg text-gray-50">
              Choose a category
            </label>
            <select
              name="category_id"
              id="category"
              className="border-none bg-white w-full mt-2 rounded-md focus:ring-0 shadow-sm"
              defaultValue={categories[0].id}
              onChange={handleChange}
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
            <label
              htmlFor="author-full-name"
              className="pl-3 text-lg text-gray-50"
            >
              <div>Add the author</div>
              <div className="mt-1 mb-2 text-sm text-gray-100">
                It will be created if not present on the search results
              </div>
            </label>
            <div className="flex justify-between items-center gap-x-5">
              <input
                type="text"
                name="full_name"
                id="author-full-name"
                className="border-none bg-white w-full mt-2 rounded-md focus:ring-0 shadow-sm focus:shadow-md"
                placeholder="Enter the full name"
                value={book.author.full_name || ""}
                onChange={handleAuthorChange}
                required
              />
              {authorLoading ? (
                <div className="animate-spin block w-min mx-auto">
                  <Loader size={32} color="white" />
                </div>
              ) : (
                <Search
                  size={32}
                  color="white"
                  className="cursor-pointer"
                  onClick={updateAuthorsSuggestions}
                />
              )}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-1 gap-y-1">
            {authorSuggestions
              ? authorSuggestions.map((author) => {
                  return (
                    <div
                      className="rounded border p-1 text-sm text-gray-700 bg-white cursor-pointer hover:text-black hover:shadow hover:bg-gray-200 active:scale-95"
                      key={author.id}
                      onClick={() => assignExistingAuthor(author)}
                    >
                      {author.full_name}
                    </div>
                  );
                })
              : null}
          </div>

          <div className="my-10">
            <label htmlFor="book-cover" className="pl-3 text-lg text-gray-50">
              Upload a book cover
            </label>
            <input
              type="file"
              name="book_cover"
              id="book-cover"
              onChange={handleFileUpload}
              className="bg-white py-2 w-full px-3 mt-5 rounded-md shadow-sm"
            />
          </div>

          <div
            className={`mt-5 text-center text-sm ${
              fileAllowed ? "" : "border border-red-400 bg-red-100 py-2 rounded"
            }`}
          >
            <p className={fileAllowed ? "text-gray-50" : "text-gray-600"}>
              Max size: 5mb
            </p>
            <p className={fileAllowed ? "text-gray-50" : "text-gray-600"}>
              Accepted types: jpeg, jpg, png
            </p>
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
        </form>
      </div>
    );
  }

  return <NoAccess />;
};

export default CreateBook;
