import { useState } from "react";
import axios from "axios";
import BookCard from "../../../../components/BookCard";
import EditBookDetails from "../../../../components/users/EditBookDetails";
import { useRouter } from "next/dist/client/router";

export const getServerSideProps = async ({ params }) => {
  const req = await fetch(`http://localhost:3001/api/books/${params.id}`);
  const res = await req.json();

  const categoriesReq = await fetch("http://localhost:3001/api/categories");
  const categoriesRes = await categoriesReq.json();

  return {
    props: {
      bookData: res.data,
      categories: categoriesRes.data,
    },
  };
};

const TileCreation = ({ bookData, userState, categories }) => {
  const [tileEntries, setTileEntries] = useState({
    first_entry: "",
    second_entry: "",
    third_entry: "",
  });

  const [editVisible, setEditVisible] = useState(false);

  const router = useRouter();

  const bcgImage = () => {
    const olSrc = `https://covers.openlibrary.org/w/olid/${bookData.ol_key}-M.jpg`;
    const dbSrc = bookData.cover_url;
    return dbSrc === null ? olSrc : dbSrc;
  };

  const hideEditForm = () => {
    setEditVisible(false);
  };

  const handleChange = (e) => {
    const newTileEntries = { ...tileEntries, [e.target.name]: e.target.value };
    setTileEntries(newTileEntries);
  };

  const createBookTile = () => {
    const url = `http://localhost:3001/api/users/${userState.user.id}/book_tiles`;
    axios
      .post(url, { book_id: bookData.id }, { withCredentials: true })
      .then((res) => {
        createTileEntries(res.data.id);
      })
      .catch((err) => console.log(err));
  };

  const createTileEntries = (bookTileId) => {
    const url = `http://localhost:3001/api/book_tiles/${bookTileId}/tile_entries`;
    const { first_entry, second_entry, third_entry } = tileEntries;

    axios
      .post(
        url,
        { first_entry, second_entry, third_entry },
        { withCredentials: true }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBookTile();

    router.push("http://localhost:3000/users/book-tiles/");
  };

  return (
    <div>
      {editVisible ? (
        <EditBookDetails
          categories={categories}
          bookData={bookData}
          hideEditForm={hideEditForm}
        />
      ) : null}

      <div className="relative mt-10 py-4">
        <img
          src={bcgImage()}
          className="absolute top-0 left-1/2 -translate-x-1/2 blur-sm backdrop-brightness-50 grayscale-50 max-h-full w-full"
        />

        <div className="w-4/5 mx-auto border bg-gray-100 my-10 rounded-md relative z-10">
          <div className="mb-2">
            <BookCard bookData={bookData} />
          </div>

          <div
            className="border-t text-center text-sm py-2 cursor-pointer hover:bg-gray-200 active:bg-gray-300 active:text-white rounded-br-md rounded-bl-md"
            onClick={() => setEditVisible(true)}
          >
            Wrong or missing author, title, category, or cover?
          </div>
        </div>
      </div>

      <div className="text-2xl text-center mb-10 py-3 px-2 bg-gray-200">
        <div className="bg-gray-100 py-2 px-2 rounded-md">
          Share your top 3 takeaways with the world!
        </div>
      </div>

      <div className="w-5/6 mx-auto my-10">
        <form onSubmit={handleSubmit}>
          <div className="my-10 pt-2 px-2 bg-gray-200 rounded shadow">
            <label
              htmlFor="first-entry"
              className="block text-center bg-gray-100 rounded shadow"
            >
              Enter your first takeaway
            </label>
            <textarea
              type="text"
              name="first_entry"
              id="first-entry"
              className="border-none bg-white w-full mt-2 rounded focus:ring-0 shadow-sm focus:shadow-md"
              placeholder="Important stuff"
              rows="10"
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="my-10 pt-2 px-2 bg-gray-200 rounded shadow">
            <label
              htmlFor="first-entry"
              className="block text-center bg-gray-100 rounded shadow"
            >
              Enter your second takeaway
            </label>
            <textarea
              type="text"
              name="second_entry"
              id="second-entry"
              className="border-none bg-white w-full mt-2 rounded-md focus:ring-0 shadow-sm focus:shadow-md"
              placeholder="Important stuff"
              rows="10"
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="my-10 pt-2 px-2 bg-gray-200 rounded ">
            <label
              htmlFor="first-entry"
              className="block text-center bg-gray-100 rounded shadow"
            >
              Enter your third takeaway
            </label>
            <textarea
              type="text"
              name="third_entry"
              id="third-entry"
              className="border-none bg-white w-full mt-2 rounded-md focus:ring-0 shadow-sm focus:shadow-md"
              placeholder="Important stuff"
              rows="10"
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-3/5 mx-auto block border mt-10 mb-5 py-2 rounded-md shadow-sm hover:shadow-md hover:bg-gray-100 active:bg-gray-200 active:shadow-lg"
          >
            Publish your thoughts!
          </button>
        </form>
      </div>
    </div>
  );
};

export default TileCreation;
