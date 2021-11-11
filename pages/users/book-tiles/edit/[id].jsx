import axios from "axios";
import { useRouter } from "next/dist/client/router";
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

  const router = useRouter();

  const handleChange = (e) => {
    const newTileEntries = { ...tileEntries, [e.target.name]: e.target.value };
    setTileEntries(newTileEntries);
  };

  // const editTileEntries = (entryId) => {
  //   const url = `http://localhost:3001/api/book_tiles/${bookTileId}/tile_entries/${entryId}`;
  //   axios
  //     .put(url, { book_id: bookData.id }, { withCredentials: true })
  //     .then((res) => {
  //       createTileEntries(res.data.id);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   router.push("http://localhost:3000/users/book-tiles/");
  // };

  return (
    <div>
      <div className="w-4/5 mx-auto mt-20 mb-10 border bg-gray-100 rounded-md shadow-md">
        <BookCard bookData={bookData} />
      </div>

      <div className="text-2xl text-center mb-10 py-3 px-2 bg-gray-200">
        <div className="bg-gray-100 py-2 px-2 rounded-md">
          Share your top 3 takeaways with the world!
        </div>
      </div>

      <div className="w-5/6 mx-auto my-10">
        <form>
          <div className="my-10 pt-2 px-2 bg-gray-200 rounded shadow">
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
              required
            >{tileEntries.first_entry}</textarea>
          </div>

          <div className="my-10 pt-2 px-2 bg-gray-200 rounded shadow">
            <label
              htmlFor="first-entry"
              className="block text-center bg-gray-100 rounded shadow"
            >
              Edit your second takeaway
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
            >{tileEntries.second_entry}</textarea>
          </div>

          <div className="my-10 pt-2 px-2 bg-gray-200 rounded ">
            <label
              htmlFor="first-entry"
              className="block text-center bg-gray-100 rounded shadow"
            >
              Edit your third takeaway
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
            >{tileEntries.third_entry}</textarea>
          </div>

          {/* <button
            type="submit"
            className="w-3/5 mx-auto block border mt-10 mb-5 py-2 rounded-md shadow-sm hover:shadow-md hover:bg-gray-100 active:bg-gray-200 active:shadow-lg"
          >
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default EditBookTile;

// need a form for each tile so that individual entries are updated