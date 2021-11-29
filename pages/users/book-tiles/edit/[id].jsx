import axios from "axios";
import { useState, useEffect } from "react";
import EditForm from "../../../../components/users/EditForm";
import EditBookDetails from "../../../../components/users/EditBookDetails";
import BookCardBackground from "../../../../components/books/BookCardBackground";
import DangerButton from "../../../../components/navigation/DangerButton";
import NoAccess from "../../../../components/users/NoAccess";
import { useRouter } from "next/dist/client/router";

export const getServerSideProps = async (context) => {
  try {
    const { id } = context.params;

    const userResp = await axios({
      method: "get",
      url: "http://localhost:3001/api/logged_in",
      headers: { cookie: context.req.headers.cookie },
    });

    const resp = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/book_tiles/${id}`,
    });

    const categoriesReq = await fetch("http://localhost:3001/api/categories");
    const categoriesRes = await categoriesReq.json();

    return {
      props: {
        bookData: resp.data.book,
        entries: resp.data.tile_entries,
        bookTileId: id,
        categories: categoriesRes.data,
      },
    };
  } catch (error) {
    return {
      props: {},
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
      first_entry: entries[0].content,
      second_entry: entries[1].content,
      third_entry: entries[2].content,
    });

    const [currentEntry, setCurrentEntry] = useState({
      id: null,
      content: "",
    });

    const [btnVisible, setBtnVisible] = useState({
      [entries[0].id]: false,
      [entries[1].id]: false,
      [entries[2].id]: false,
    });

    const [editVisible, setEditVisible] = useState(false);

    const router = useRouter();

    const hideEditForm = () => {
      setEditVisible(false);
    };

    const showEditForm = () => {
      setEditVisible(true);
    };

    const showBtn = (entryId) => {
      setBtnVisible({
        [entries[0].id]: false,
        [entries[1].id]: false,
        [entries[2].id]: false,
      });
      setBtnVisible({ [entryId]: true });
    };

    const bcgImage = () => {
      const olSrc = `https://covers.openlibrary.org/w/olid/${bookData.ol_key}-M.jpg`;
      const dbSrc = bookData.cover_url;
      return dbSrc === null ? olSrc : dbSrc;
    };

    const handleChange = (e) => {
      const newTileEntries = {
        ...tileEntries,
        [e.target.name]: e.target.value,
      };
      setTileEntries(newTileEntries);
      setCurrentEntry({ ...currentEntry, content: e.target.value });
    };

    const setCurrentId = (id) => {
      setCurrentEntry({ ...currentEntry, id: id });
    };

    const editEntry = (entryId, entryContent) => {
      const url = `http://localhost:3001/api/book_tiles/${bookTileId}/tile_entries/${entryId}`;
      axios
        .put(url, { content: entryContent }, { withCredentials: true })
        .then((res) => {
          if (res.status == 200) {
            setBtnVisible({ [entryId]: false });
          }
        })
        .catch((err) => console.log(err));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      editEntry(currentEntry.id, currentEntry.content);
    };

    const deleteBookTile = () => {
      axios
        .delete(
          `http://localhost:3001/api/users/${userState.user.id}/book_tiles/${bookTileId}`,
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          router.push("/users/book-tiles");
        })
        .catch((err) => console.log(err));
    };

    useEffect(() => {
      entries.sort((a, b) => (a.updated_at > b.updated_at ? -1 : 1));
    }, []);

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
          <BookCardBackground
            bookData={bookData}
            bcgImage={bcgImage}
            showEditForm={showEditForm}
          />
        </div>

        <div className="text-2xl text-center mb-10 py-3 px-2 bg-gray-200">
          <div className="bg-gray-100 py-2 px-2 rounded-md">
            Edit your entries for this book
          </div>
        </div>

        {entries.map((entry) => {
          return (
            <EditForm
              content={entry.content}
              entryId={entry.id}
              updateTime={entry.updated_at}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setCurrentId={setCurrentId}
              btnVisible={btnVisible[entry.id]}
              showBtn={showBtn}
              key={entry.id}
            />
          );
        })}

        <div className="my-10 w-2/5 mx-auto" onClick={() => deleteBookTile()}>
          <DangerButton text="Delete book tile" />
        </div>
      </div>
    );
  } else {
    return <NoAccess />;
  }
};

export default EditBookTile;
