import axios from "axios";
import Link from "next/dist/client/link";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { AlertCircle, Save } from "react-feather";
import CardBcgActions from "../../../../components/books/CardBcgActions";
import EditBookDetails from "../../../../components/users/EditBookDetails";
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

    const isAvailable = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/book_tiles/${context.params.id}/is_available`,
      headers: { cookie: context.req.headers.cookie },
    });

    return {
      props: {
        bookData: bookData.data.data,
        categories: categories.data.data,
        isAvailable: isAvailable.data.res,
        tempEntries: isAvailable.data.temporary_entries || null,
        existingTile: isAvailable.data.existing_book_tile || null,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

const TileCreation = ({
  bookData,
  userState,
  categories,
  isAvailable,
  existingTile,
  tempEntries,
}) => {
  const [editVisible, setEditVisible] = useState(false);

  const bcgImage = () => {
    const olSrc = `https://covers.openlibrary.org/w/olid/${bookData.ol_key}-M.jpg`;
    const dbSrc = bookData.cover_url;
    return dbSrc === null ? olSrc : dbSrc;
  };

  const showEditForm = () => {
    setEditVisible(true);
  };

  const hideEditForm = () => {
    setEditVisible(false);
  };

  const [tileEntries, setTileEntries] = useState({
    first_entry: {
      content: tempEntries
        ? tempEntries[0]
          ? tempEntries[0].content
          : ""
        : "",
      id: tempEntries ? (tempEntries[0] ? tempEntries[0].id : null) : null,
    },
    second_entry: {
      content: tempEntries
        ? tempEntries[1]
          ? tempEntries[1].content
          : ""
        : "",
      id: tempEntries ? (tempEntries[1] ? tempEntries[1].id : null) : null,
    },
    third_entry: {
      content: tempEntries
        ? tempEntries[2]
          ? tempEntries[2].content
          : ""
        : "",
      id: tempEntries ? (tempEntries[2] ? tempEntries[2].id : null) : null,
    },
  });

  const isEntryValid = (entry) => {
    if (entry.content.trim().length > 50) return true;
    return false;
  };

  const allEntriesValid = () => {
    const { first_entry, second_entry, third_entry } = tileEntries;
    if (
      isEntryValid(first_entry) &&
      isEntryValid(second_entry) &&
      isEntryValid(third_entry)
    )
      return true;
    else return false;
  };

  if (userState.isLogged && isAvailable) {
    const router = useRouter();

    const handleChange = (e) => {
      const newTileEntries = {
        ...tileEntries,
        [e.target.name]: {
          content: e.target.value,
          id: tileEntries[e.target.name].id,
        },
      };
      setTileEntries(newTileEntries);
    };

    const findOrCreateBookTile = async () => {
      const url = `http://localhost:3001/api/users/${userState.user.id}/book_tiles`;
      const resp = await axios.post(
        url,
        { book_id: bookData.id },
        { withCredentials: true }
      );

      return resp.data;
    };

    const createForLater = async (entry) => {
      const bookTile = await findOrCreateBookTile();

      axios
        .post(
          `http://localhost:3001/api/book_tiles/${bookTile.id}/temporary_entries`,
          { content: entry.content },
          { withCredentials: true }
        )
        .catch((err) => console.log(err));
    };

    const updateForLater = async (entry) => {
      const bookTile = await findOrCreateBookTile();

      axios
        .put(
          `http://localhost:3001/api/book_tiles/${bookTile.id}/temporary_entries/${entry.id}`,
          { content: entry.content },
          { withCredentials: true }
        )
        .catch((err) => console.log(err));
    };

    const saveForLater = (entry) => {
      if (entry.id == null) {
        createForLater(entry);
      } else {
        updateForLater(entry);
      }
    };

    const createTileEntries = async () => {
      const bookTile = await findOrCreateBookTile();

      const url = `http://localhost:3001/api/book_tiles/${bookTile.id}/tile_entries`;
      const { first_entry, second_entry, third_entry } = tileEntries;

      axios
        .post(
          url,
          { first_entry, second_entry, third_entry },
          { withCredentials: true }
        )
        .then(() => router.push("/users/book-tiles/1"))
        .catch((err) => console.log(err));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      createTileEntries();
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

        <div className="w-4/5 mx-auto text-3xl text-gray-800 text-center mt-10">
          Share your top takeaways for this book
        </div>

        <div className="w-4/5 mx-auto md:w-4/6 lg:w-3/6 my-10">
          <form onSubmit={handleSubmit}>
            <div className="my-10 pt-2 px-2 bg-gray-200 shadow-lg rounded">
              <label
                htmlFor="first-entry"
                className="flex justify-around text-center py-2 bg-white shadow-sm rounded"
              >
                <div>Enter your first takeaway</div>
                {isEntryValid(tileEntries.first_entry) ? (
                  <Save
                    className="cursor-pointer hover:scale-110 active:scale-100"
                    onClick={() => saveForLater(tileEntries.first_entry)}
                  />
                ) : (
                  <Save className="text-gray-200" />
                )}
              </label>
              <textarea
                type="text"
                name="first_entry"
                id="first-entry"
                className="border-none bg-white w-full mt-2 focus:ring-0 shadow-sm focus:shadow-md rounded"
                placeholder="Important stuff"
                rows="10"
                onChange={handleChange}
                value={tileEntries.first_entry.content || null}
                required
              ></textarea>
            </div>

            <div className="my-10 pt-2 px-2 bg-gray-200 shadow-lg rounded">
              <label
                htmlFor="second-entry"
                className="flex justify-around text-center py-2 bg-white shadow-sm rounded"
              >
                <div>Enter your second takeaway</div>
                {isEntryValid(tileEntries.second_entry) ? (
                  <Save
                    className="cursor-pointer hover:scale-110 active:scale-100"
                    onClick={() => saveForLater(tileEntries.second_entry)}
                  />
                ) : (
                  <Save className="text-gray-200" />
                )}
              </label>
              <textarea
                type="text"
                name="second_entry"
                id="second-entry"
                className="border-none bg-white w-full mt-2 focus:ring-0 shadow-sm focus:shadow-md rounded"
                placeholder="Important stuff"
                rows="10"
                onChange={handleChange}
                value={tileEntries.second_entry.content || null}
                required
              ></textarea>
            </div>

            <div className="my-10 pt-2 px-2 bg-gray-200 shadow-lg rounded">
              <label
                htmlFor="third-entry"
                className="flex justify-around text-center py-2 bg-white shadow-sm rounded"
              >
                <div>Enter your third takeaway</div>
                {isEntryValid(tileEntries.third_entry) ? (
                  <Save
                    className="cursor-pointer hover:scale-110 active:scale-100"
                    onClick={() => saveForLater(tileEntries.third_entry)}
                  />
                ) : (
                  <Save className="text-gray-200" />
                )}
              </label>
              <textarea
                type="text"
                name="third_entry"
                id="third-entry"
                className="border-none bg-white w-full mt-2 focus:ring-0 shadow-sm focus:shadow-md rounded"
                placeholder="Important stuff"
                rows="10"
                onChange={handleChange}
                value={tileEntries.third_entry.content || null}
                required
              ></textarea>
            </div>

            {allEntriesValid() ? (
              <button
                type="submit"
                className="w-3/5 mx-auto block border mt-10 mb-5 py-2 rounded-md shadow-md hover:shadow-lg hover:bg-gray-100 active:bg-gray-200 active:shadow-lg"
              >
                Publish your thoughts!
              </button>
            ) : (
              <button
                type="submit"
                disabled
                className="w-3/5 mx-auto block border mt-10 mb-5 py-2 rounded-md text-gray-200"
              >
                Publish your thoughts!
              </button>
            )}
          </form>
        </div>
      </div>
    );
  } else if (userState.isLogged && !isAvailable) {
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
        <div className="my-20 mx-auto w-4/5 md:w-4/6 lg:w-3/6">
          <div className="flex justify-around items-center">
            <AlertCircle
              className="w-1/6"
              size={36}
              strokeWidth={1.5}
              fill="lightgray"
            />
            <div className="w-4/6">
              You have already shared your insights for this book!
            </div>
          </div>

          <div className="mt-20 bg-gray-100 p-10 text-center text-lg rounded-md shadow hover:bg-gray-200 hover:shadow-md active:bg-gray-300 cursor-pointer transition">
            <Link href={`/users/book-tiles/edit/${existingTile.id}`}>
              <div>
                Click here to check and edit your insights for this book now
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mx-auto mt-10 w-4/5 md:w-4/6 lg:w-3/6">
        <NoAccess />
      </div>
    );
  }
};

export default TileCreation;
