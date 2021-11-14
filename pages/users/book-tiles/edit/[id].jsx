import axios from "axios";
import { useState } from "react";
import BookCard from "../../../../components/BookCard";
import EditForm from "../../../../components/users/EditForm";

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const userResp = await axios({
    method: "get",
    url: "http://localhost:3001/api/logged_in",
    headers: { cookie: context.req.headers.cookie },
  });

  const resp = await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${userResp.data.user.id}/book_tiles/${id}`,
    withCredentials: true,
  });

  return {
    props: {
      bookData: resp.data.book,
      entries: resp.data.tile_entries,
      bookTileId: id,
    },
  };
};

const EditBookTile = ({ bookData, entries, bookTileId }) => {
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

  const showBtn = (entryId) => {
    setBtnVisible({
      [entries[0].id]: false,
      [entries[1].id]: false,
      [entries[2].id]: false,
    });
    setBtnVisible({ [entryId]: true });
  };

  const handleChange = (e) => {
    const newTileEntries = { ...tileEntries, [e.target.name]: e.target.value };
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

  return (
    <div>
      <div className="w-4/5 mx-auto mt-20 mb-10 border bg-gray-100 rounded-md shadow-md">
        <BookCard bookData={bookData} />
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
    </div>
  );
};

export default EditBookTile;
