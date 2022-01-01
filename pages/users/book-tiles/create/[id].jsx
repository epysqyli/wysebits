import axios from "axios";
import Link from "next/dist/client/link";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { AlertCircle, Save } from "react-feather";
import CardBcgActions from "../../../../components/books/CardBcgActions";
import EditBookDetails from "../../../../components/users/EditBookDetails";
import NoAccess from "../../../../components/users/NoAccess";
import CreateEntryForm from "../../../../components/users/CreateEntryForm";

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

  const getEntryContent = (entryIndex) => {
    return tempEntries
      ? tempEntries[entryIndex]
        ? tempEntries[entryIndex].content
        : ""
      : "";
  };

  const getEntryId = (entryIndex) => {
    return tempEntries
      ? tempEntries[entryIndex]
        ? tempEntries[entryIndex].id
        : null
      : null;
  };

  const [tileEntries, setTileEntries] = useState({
    first_entry: {
      content: getEntryContent(0),
      id: getEntryId(0),
      name: "first_entry",
    },
    second_entry: {
      content: getEntryContent(1),
      id: getEntryId(1),
      name: "second_entry",
    },
    third_entry: {
      content: getEntryContent(2),
      id: getEntryId(2),
      name: "third_entry",
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
          name: tileEntries[e.target.name].name,
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
            {Object.values(tileEntries).map((entry, index) => {
              return (
                <div
                  key={entry.id || index}
                  className="my-10 bg-gray-200 shadow-md rounded-md"
                >
                  <CreateEntryForm
                    entry={entry}
                    isEntryValid={isEntryValid}
                    handleChange={handleChange}
                    saveForLater={saveForLater}
                  />
                </div>
              );
            })}

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
