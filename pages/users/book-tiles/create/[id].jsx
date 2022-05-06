import axios from "axios";
import Link from "next/dist/client/link";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { AlertCircle } from "react-feather";
import CardBcgActions from "../../../../components/books/CardBcgActions";
import EditBookDetails from "../../../../components/users/EditBookDetails";
import NoAccess from "../../../../components/users/NoAccess";
import CreateEntrySlider from "../../../../components/users/CreateEntrySlider";
import { isEntryValid } from "../../../../lib/utils";
import DangerButton from "../../../../components/navigation/DangerButton";
import { isLogged } from "../../../../lib/auth";

import {
  getBook,
  getCategories,
  getLoggedUser,
  isBookTileAvailable,
} from "../../../../lib/serverSideMethods";

export const getServerSideProps = async (context) => {
  const categories = await getCategories();
  const bookData = await getBook(context.params.id);

  if (isLogged(context)) {
    const loggedUser = await getLoggedUser(context);
    const isAvailable = await isBookTileAvailable(loggedUser, context);

    return {
      props: {
        bookData: bookData.data,
        categories: categories.data,
        isAvailable: isAvailable.data.res,
        tempEntries: isAvailable.data.temporary_entries || null,
        existingTile: isAvailable.data.existing_book_tile || null,
      },
    };
  } else {
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
  const [confirmAnimation, setConfirmAnimation] = useState("");
  const [deletable, setDeletable] = useState(
    tempEntries !== null ? true : false
  );

  const bcgImage = () => {
    const olSrc = `https://covers.openlibrary.org/w/olid/${bookData.ol_key}-M.jpg`;
    const dbSrc = bookData.cover_url;
    return dbSrc === null ? olSrc : dbSrc;
  };

  const showEditForm = () => setEditVisible(true);
  const hideEditForm = () => setEditVisible(false);

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

  const allEntriesValid = () => {
    const { first_entry, second_entry, third_entry } = tileEntries;
    if (
      isEntryValid(first_entry.content) &&
      isEntryValid(second_entry.content) &&
      isEntryValid(third_entry.content)
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
      const resp = await axios({
        method: "POST",
        url: `${process.env.BASE_URL}/users/${userState.user.id}/book_tiles`,
        data: { book_id: bookData.id },
        withCredentials: true,
      });

      return resp.data;
    };

    const createForLater = async (entry) => {
      const bookTile = await findOrCreateBookTile();

      const createdEntry = await axios({
        method: "POST",
        url: `${process.env.BASE_URL}/book_tiles/${bookTile.id}/temporary_entries`,
        data: { content: entry.content },
        withCredentials: true,
      });

      tileEntries[entry.name].id = createdEntry.data.id;
    };

    const updateForLater = async (entry) => {
      const bookTile = await findOrCreateBookTile();

      await axios({
        method: "PUT",
        url: `${process.env.BASE_URL}/book_tiles/${bookTile.id}/temporary_entries/${entry.id}`,
        data: { content: entry.content },
        withCredentials: true,
      });
    };

    const setEntriesToEmptyContent = () => {
      const emptyEntries = {
        first_entry: {
          content: "",
          id: getEntryId(0),
          name: "first_entry",
        },
        second_entry: {
          content: "",
          id: getEntryId(1),
          name: "second_entry",
        },
        third_entry: {
          content: "",
          id: getEntryId(2),
          name: "third_entry",
        },
      };

      setTileEntries(emptyEntries);
    };

    const deleteTempEntries = async (userId, bookTileId) => {
      return await axios({
        method: "DELETE",
        url: `${process.env.BASE_URL}/users/${userId}/book_tiles/${bookTileId}`,
        withCredentials: true,
      });
    };

    const deleteEntriesAndUpdateState = async (userId, bookTileId) => {
      const resp = confirm(
        "Are you sure you want to delete these contributions?"
      );

      if (resp === true) {
        await deleteTempEntries(userId, bookTileId);
        setEntriesToEmptyContent();
        setDeletable(false);
      }
    };

    const addConfirmAnimation = () => {
      setConfirmAnimation("animate-confirm-update");
    };

    const clearConfirmAnimation = () => setConfirmAnimation("");

    const saveForLater = async (entry) => {
      addConfirmAnimation();
      if (entry.id === null) {
        await createForLater(entry);
      } else {
        await updateForLater(entry);
      }
      setTimeout(clearConfirmAnimation, "100");
      setDeletable(true);
    };

    const createTileEntries = async () => {
      const bookTile = await findOrCreateBookTile();

      const url = `${process.env.BASE_URL}/book_tiles/${bookTile.id}/tile_entries`;
      const { first_entry, second_entry, third_entry } = tileEntries;

      await axios({
        method: "POST",
        url: url,
        data: {
          first_entry: first_entry.content,
          second_entry: second_entry.content,
          third_entry: third_entry.content,
        },
        withCredentials: true,
      });

      router.push("/users/book-tiles?page=1");
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      await createTileEntries();
    };

    return (
      <div className="pt-10 lg:pt-16">
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

        <div className="w-11/12 mx-auto text-3xl text-gray-50 text-center font-medium mt-10 select-none">
          Share your top takeaways for this book
        </div>

        <div className="mx-auto w-11/12 md:w-4/5 lg:w-4/6 xl:w-1/2 2xl:w-2/5 mt-10 pb-10">
          <form onSubmit={handleSubmit}>
            <CreateEntrySlider
              entries={Object.values(tileEntries)}
              isEntryValid={isEntryValid}
              handleChange={handleChange}
              saveForLater={saveForLater}
              confirmAnimation={confirmAnimation}
            />

            {allEntriesValid() ? (
              <button
                type="submit"
                className="w-3/5 md:w-2/5 xl:w-2/5 mx-auto block border mt-10 py-2 rounded-md shadow-md hover:shadow-lg text-gray-50 hover:bg-gray-100 hover:text-gray-600 active:bg-gray-200 active:shadow-lg"
              >
                Publish your thoughts!
              </button>
            ) : (
              <button
                type="submit"
                disabled
                className="w-3/5 md:w-2/5 xl:w-2/5 mx-auto block border border-gray-300 mt-10 py-2 rounded-md text-gray-400 cursor-default"
              >
                Publish your thoughts!
              </button>
            )}
          </form>

          {tempEntries !== null && deletable ? (
            <div
              onClick={() =>
                deleteEntriesAndUpdateState(
                  userState.user.id,
                  tempEntries[0].book_tile_id
                )
              }
              className="w-3/5 md:w-2/5 xl:w-2/5 mx-auto my-10"
            >
              <DangerButton text="Delete work in progress insights" />
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  if (userState.isLogged && !isAvailable) {
    return (
      <div className="pt-10 lg:pt-16">
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
              size={36}
              strokeWidth={1.5}
              className="rounded-3xl w-1/4 text-gray-100"
              fill="transparent"
            />
            <div className="w-4/6 md:text-lg text-gray-50">
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
  }

  return (
    <div className="mx-auto mt-10 w-4/5 md:w-4/6 lg:w-3/6 pt-16">
      <NoAccess />
    </div>
  );
};

export default TileCreation;
