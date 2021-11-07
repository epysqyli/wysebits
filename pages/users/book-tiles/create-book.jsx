import { useState } from "react";
import FileUploader from "../../../components/FileUploader";
import axios from "axios";
import { useRouter } from "next/dist/client/router";

export const getStaticProps = async () => {
  const resp = await fetch("http://localhost:3001/api/categories");
  const categories = await resp.json();

  return {
    props: {
      categories: categories.data,
    },
  };
};

const CreateBook = ({ categories }) => {
  const [bookData, setBookData] = useState({
    title: "",
    author_full_name: "",
    category_id: "25",
  });

  const [file, setFile] = useState(null);

  const makeSlug = (string) => string.split(" ").join("-").toLowerCase();

  const router = useRouter();

  const handleChange = (e) => {
    const newFormData = { ...bookData, [e.target.name]: e.target.value };
    setBookData(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", bookData.title);
    formData.append("author_full_name", bookData.author_full_name);
    formData.append("category_id", bookData.category_id);
    formData.append("book_cover", file);

    axios
      .post("http://localhost:3001/api/books", formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        router.push(
          {
            pathname: "/users/book-tiles/book-tile-creation/[id]",
            query: { id: res.data.id },
          },
          makeSlug(res.data.title)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-4/5 mx-auto my-20 pb-10">
      <div className="text-2xl font-medium text-center">
        Fill in the required fields to create a book entry
      </div>

      <form
        action="http://localhost:3001/api/books"
        method="post"
        encType="multipart/form-data"
        className="py-5"
        onSubmit={handleSubmit}
      >
        <div className="my-10">
          <label htmlFor="title" className="pl-3">
            Enter the book title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="border-none bg-white w-full mt-2 rounded-md focus:ring-0"
            placeholder="Book title"
            onChange={handleChange}
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
            className="border-none bg-white w-full mt-2 rounded-md focus:ring-0"
            defaultValue={categories[24].id}
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
          <label htmlFor="author-full-name" className="pl-3">
            Add the author
          </label>
          <input
            type="text"
            name="author_full_name"
            id="author-full-name"
            className="border-none bg-white w-full mt-2 rounded-md focus:ring-0"
            placeholder="Enter the full name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="my-10">
          <FileUploader onFileSelect={(file) => setFile(file)} />
        </div>

        <button
          type="submit"
          className="w-3/5 mx-auto block border mt-10 mb-5 py-2 rounded-md shadow-sm hover:shadow-md hover:bg-gray-100 active:bg-gray-200 active:shadow-lg"
        >
          Create the book
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
