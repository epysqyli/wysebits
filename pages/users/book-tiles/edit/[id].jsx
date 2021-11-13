import axios from "axios";
import { useState } from "react";
import BookCard from "../../../../components/BookCard";

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

const EditBookTile = ({ bookData, entries, bookTileId, userState }) => {
  const [tileEntries, setTileEntries] = useState({
    first_entry: entries[0].content,
    second_entry: entries[1].content,
    third_entry: entries[2].content,
  });

  const [currentEntry, setCurrentEntry] = useState({
    id: null,
    content: "",
  });

  const handleChange = (e) => {
    const newTileEntries = { ...tileEntries, [e.target.name]: e.target.value };
    setTileEntries(newTileEntries);
    setCurrentEntry({
      content: e.target.value,
    });
    setCurrentId();
  };

  const setCurrentId = () => {
    let currentId = null;
    if (currentEntry.content == tileEntries.first_entry) {
      currentId = entries[0].id;
    } else if (currentEntry.content == tileEntries.second_entry) {
      currentId = entries[1].id;
    } else {
      currentId = entries[2].id;
    }

    const newCurrentEntry = { content: currentEntry.content, id: currentId };
    setCurrentEntry(newCurrentEntry);
  };

  const editEntry = (entryId, entry_content) => {
    const url = `http://localhost:3001/api/book_tiles/${bookTileId}/tile_entries/${entryId}`;
    axios
      .put(url, { content: entry_content }, { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="w-4/5 mx-auto mt-20 mb-10 border bg-gray-100 rounded-md shadow-md">
        <BookCard bookData={bookData} />
      </div>

      <div className="text-2xl text-center mb-10 py-3 px-2 bg-gray-200">
        <div className="bg-gray-100 py-2 px-2 rounded-md">
          Edit some or all of your takeaways
        </div>
      </div>

      <form
        className="w-5/6 mx-auto my-10 pt-2 pb-5 px-2 bg-gray-200 rounded shadow"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="first-entry"
          className="block text-center bg-gray-100 rounded shadow"
        >
          Edit your first takeaway
        </label>
        <textarea
          type="text"
          name="first_entry"
          id="first-entry"
          className="border-none bg-white w-full mt-2 rounded focus:ring-0 shadow-sm focus:shadow-md"
          placeholder="Important stuff"
          rows="10"
          onChange={handleChange}
          value={tileEntries.first_entry}
          required
        ></textarea>
        <button
          type="submit"
          className="w-3/5 mx-auto block border mt-10 mb-5 py-2 bg-white"
        >
          Edit this entry
        </button>
      </form>
    </div>
  );
};

export default EditBookTile;
