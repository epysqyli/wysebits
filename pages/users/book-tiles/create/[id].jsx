import { useState } from "react";
import axios from "axios";
import CardBcgActions from "../../../../components/books/CardBcgActions";
import EditBookDetails from "../../../../components/users/EditBookDetails";
import { useRouter } from "next/dist/client/router";
import NoAccess from "../../../../components/users/NoAccess";

export const getServerSideProps = async (context) => {
  const bookData = await axios.get(
    `http://localhost:3001/api/books/${context.params.id}`
  );
  const categories = await axios.get("http://localhost:3001/api/categories");

  try {
    const userResp = await axios({
      method: "get",
      url: "http://localhost:3001/api/logged_in",
      headers: { cookie: context.req.headers.cookie },
    });

    const bookTiles = await axios.get(
      `http://localhost:3001/api/users/${userResp.data.user.id}/book_tiles_no_pagy`
    );

    const isAvailable = bookTiles.data.tiles.every(
      (tile) => tile.book_id !== bookData.data.data.id
    );

    return {
      props: {
        bookData: bookData.data.data,
        categories: categories.data.data,
        isAvailable: isAvailable,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

const TileCreation = ({ bookData, userState, categories, isAvailable }) => {
  if (userState.isLogged) {
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

    const showEditForm = () => {
      setEditVisible(true);
    };

    const handleChange = (e) => {
      const newTileEntries = {
        ...tileEntries,
        [e.target.name]: e.target.value,
      };
      setTileEntries(newTileEntries);
    };

    const createBookTile = () => {
      const url = `http://localhost:3001/api/users/${userState.user.id}/book_tiles`;
      axios
        .post(url, { book_id: bookData.id }, { withCredentials: true })
        .then((res) => {
          createTileEntries(res.data.id);
          router.push("http://localhost:3000/users/book-tiles/1");
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

        <div className="relative">
          <CardBcgActions
            bookData={bookData}
            bcgImage={bcgImage}
            showEditForm={showEditForm}
          />
        </div>

        <div className="text-xl text-center mb-10 py-3 px-10 bg-gray-200 border-t-4 border-gray-300">
          Share your top takeaways for this book
        </div>

        <div className="w-5/6 mx-auto my-10">
          <form onSubmit={handleSubmit}>
            <div className="my-10 pt-2 px-2 bg-gray-200 shadow-lg rounded">
              <label
                htmlFor="first-entry"
                className="block text-center py-2 bg-white shadow-sm rounded"
              >
                Enter your first takeaway
              </label>
              <textarea
                type="text"
                name="first_entry"
                id="first-entry"
                className="border-none bg-white w-full mt-2 focus:ring-0 shadow-sm focus:shadow-md rounded"
                placeholder="Important stuff"
                rows="10"
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="my-10 pt-2 px-2 bg-gray-200 shadow-lg rounded">
              <label
                htmlFor="second-entry"
                className="block text-center py-2 bg-white shadow-sm rounded"
              >
                Enter your second takeaway
              </label>
              <textarea
                type="text"
                name="second_entry"
                id="second-entry"
                className="border-none bg-white w-full mt-2 focus:ring-0 shadow-sm focus:shadow-md rounded"
                placeholder="Important stuff"
                rows="10"
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="my-10 pt-2 px-2 bg-gray-200 shadow-lg rounded">
              <label
                htmlFor="third-entry"
                className="block text-center py-2 bg-white shadow-sm rounded"
              >
                Enter your third takeaway
              </label>
              <textarea
                type="text"
                name="third_entry"
                id="third-entry"
                className="border-none bg-white w-full mt-2 focus:ring-0 shadow-sm focus:shadow-md rounded"
                placeholder="Important stuff"
                rows="10"
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-3/5 mx-auto block border mt-10 mb-5 py-2 rounded-md shadow-md hover:shadow-lg hover:bg-gray-100 active:bg-gray-200 active:shadow-lg"
            >
              Publish your thoughts!
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return <NoAccess />;
  }
};

export default TileCreation;
