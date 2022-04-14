import axios from "axios";
import { useState, useEffect } from "react";
import EditEntrySlider from "../../../../components/users/EditEntrySlider";
import EditBookDetails from "../../../../components/users/EditBookDetails";
import CardBcgActions from "../../../../components/books/CardBcgActions";
import DangerButton from "../../../../components/navigation/DangerButton";
import NoAccess from "../../../../components/users/NoAccess";
import { useRouter } from "next/dist/client/router";

import {
  getLoggedUser,
  getBookTile,
  getCategories,
} from "../../../../lib/serverSideMethods";

export const getServerSideProps = async (context) => {
  try {
    const { id } = context.params;

    const loggedUser = await getLoggedUser(context);
    const bookData = await getBookTile(loggedUser, id);
    const categories = await getCategories();

    return {
      props: {
        bookData: bookData.data.book,
        entries: bookData.data.tile_entries,
        bookTileId: id,
        categories: categories.data,
      },
    };
  } catch (error) {
    return {
      props: { error: error.message },
    };
  }
};

const EditBookTile = ({
  bookData,
  entries,
  bookTileId,
  categories,
  userState,
}) => {
  if (userState.isLogged) {
    const [tileEntries, setTileEntries] = useState({
      first_entry: {
        content: entries[0].content,
        id: entries[0].id,
        name: "first_entry",
        updateTime: entries[0].updated_at,
      },
      second_entry: {
        content: entries[1].content,
        id: entries[1].id,
        name: "second_entry",
        updateTime: entries[1].updated_at,
      },
      third_entry: {
        content: entries[2].content,
        id: entries[2].id,
        name: "third_entry",
        updateTime: entries[2].updated_at,
      },
    });
    const [editVisible, setEditVisible] = useState(false);
    const [confirmAnimation, setConfirmAnimation] = useState("");
    const router = useRouter();

    const hideEditForm = () => setEditVisible(false);
    const showEditForm = () => setEditVisible(true);

    const bcgImage = () => {
      const olSrc = `https://covers.openlibrary.org/w/olid/${bookData.ol_key}-M.jpg`;
      const dbSrc = bookData.cover_url;
      return dbSrc === null ? olSrc : dbSrc;
    };

    const addConfirmAnimation = () => {
      setConfirmAnimation("animate-confirm-update");
    };

    const clearConfirmAnimation = () => setConfirmAnimation("");

    const handleChange = (e) => {
      console.log(e.target.name);
      const newTileEntries = {
        ...tileEntries,
        [e.target.name]: {
          content: e.target.value,
          id: tileEntries[e.target.name].id,
          name: tileEntries[e.target.name].name,
          updateTime: tileEntries[e.target.name].updated_at,
        },
      };
      setTileEntries(newTileEntries);
    };

    const editEntry = async (entry) => {
      addConfirmAnimation();

      await axios({
        method: "PUT",
        url: `${process.env.BASE_URL}/book_tiles/${bookTileId}/tile_entries/${entry.id}`,
        data: { content: entry.content },
        withCredentials: true,
      });

      setTimeout(clearConfirmAnimation, "100");
    };

    const confirmDelete = async () => {
      await axios({
        method: "DELETE",
        url: `${process.env.BASE_URL}/users/${userState.user.id}/book_tiles/${bookTileId}`,
        withCredentials: true,
      });

      router.push("/users/book-tiles?page=1");
    };

    const deleteBookTile = () => {
      const resp = confirm(
        "Are you sure you want to delete these contributions?"
      );
      if (resp === true) confirmDelete();
    };

    const handleSubmit = (e, entry) => {
      e.preventDefault();
      editEntry(entry);
    };

    useEffect(() => {
      entries.sort((a, b) => (a.updated_at > b.updated_at ? -1 : 1));
    }, []);

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

        <div className="text-3xl text-gray-50 text-center mt-10 px-5 select-none">
          Edit your takeaways for this book
        </div>

        <div className="mx-auto w-11/12 md:w-4/5 lg:w-4/6 xl:w-1/2 2xl:w-2/5 mt-10">
          <EditEntrySlider
            entries={Object.values(tileEntries)}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            confirmAnimation={confirmAnimation}
          />
        </div>

        <div
          className="my-10 w-2/5 xl:w-1/5 mx-auto"
          onClick={() => deleteBookTile()}
        >
          <DangerButton text="Delete book tile" />
        </div>
      </div>
    );
  }

  if (userState.isLogged === false)
    return (
      <div className="mx-auto mt-10 w-4/5 md:w-4/6 lg:w-3/6 pt-16">
        <NoAccess />
      </div>
    );
};

export default EditBookTile;
