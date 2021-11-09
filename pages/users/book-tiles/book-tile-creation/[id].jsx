import { useState } from "react";
import axios from "axios";
import useSWR from "swr";

export const getServerSideProps = async ({ params }) => {
  const req = await fetch(`http://localhost:3001/api/books/${params.id}`);
  const res = await req.json();

  return {
    props: {
      bookData: res.data,
    },
  };
};

const CreateBookTile = ({ bookData }) => {
  const [book, setBook] = useState(null);
  const [tileEntries, setTileEntry] = useState({
    first_entry: '',
    second_entry: '',
    third_entry: '',
  })

  const olSrc = `https://covers.openlibrary.org/w/olid/${bookData.ol_key}-M.jpg`;
  const dbSrc = bookData.cover_url;

  const coverImage = (
    <img
      className="w-2/6 rounded-md bg-gray-200 object-cover"
      src={dbSrc || olSrc || ""}
    />
  );

  const handleChange = () => {
    // handle state
  }

  const handleSubmit = () => {
    // post call
  }

  return (
    <div>
      <div className="w-4/5 mx-auto mt-20 mb-10">
        <div className="flex justify-between p-2 border bg-gray-100 rounded-md shadow-md">
          {coverImage}

          <div className="w-3/6">
            <div className="text-xl mb-5 font-medium">{bookData.title}</div>
            <div className="text-sm">{bookData.category.name}</div>
            <div className="text-sm italic">
              {bookData.authors[0] ? bookData.authors[0].full_name : "No authors found"}
            </div>
          </div>
        </div>
      </div>

      <div className="text-2xl text-center mb-10 py-3 px-2 bg-gray-200">
        <div className="bg-gray-100 py-2 px-2 rounded-md">
          Share your top 3 takeaways with the world!
        </div>
      </div>

      <div className="w-4/5 mx-auto my-10">
        <form onSubmit={handleSubmit}>
          <div className="my-10">
            <label htmlFor="first-entry" className="pl-3">
              Enter your first takeaway
            </label>
            <textarea
              type="text"
              name="first_entry"
              id="first-entry"
              className="border-none bg-white w-full mt-2 rounded-md focus:ring-0 shadow-sm focus:shadow-md"
              placeholder="Important stuff"
              rows="10"
              required
            ></textarea>
          </div>

          <div className="my-10">
            <label htmlFor="second-entry" className="pl-3">
              Enter your second takeaway
            </label>
            <textarea
              type="text"
              name="second_entry"
              id="second-entry"
              className="border-none bg-white w-full mt-2 rounded-md focus:ring-0 shadow-sm focus:shadow-md"
              placeholder="Important stuff"
              rows="10"
              required
            ></textarea>
          </div>

          <div className="my-10">
            <label htmlFor="third-entry" className="pl-3">
              Enter your third takeaway
            </label>
            <textarea
              type="text"
              name="third_entry"
              id="third-entry"
              className="border-none bg-white w-full mt-2 rounded-md focus:ring-0 shadow-sm focus:shadow-md"
              placeholder="Important stuff"
              rows="10"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-3/5 mx-auto block border mt-10 mb-5 py-2 rounded-md shadow-sm hover:shadow-md hover:bg-gray-100 active:bg-gray-200 active:shadow-lg"
          >
            Create book tile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBookTile;
