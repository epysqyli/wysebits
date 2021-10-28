import Head from "next/head";
import { useState } from "react";

const Create = () => {
  const [searchTerms, setSearchTerms] = useState([]);

  const handleChange = (e) => {
    setSearchTerms(e.target.value.split(" "));
  };

  return (
    <div>
      <Head>
        <title>Create book tile</title>
      </Head>

      <div className="w-4/5 mx-auto mt-20">
        <form action="" method="post" className="w-full mx-auto py-10">
          <label htmlFor="tmp" className="pl-1 text-lg font-medium">
            What book did you just read?
          </label>

          <input
            type="text"
            name="tmp"
            id="tmp"
            className="block mt-5 py-3 w-full border-none focus:ring-0 rounded-lg shadow-sm focus:shadow-md transition-shadow"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="block mx-auto w-4/6 border rounded-lg px-5 py-2 bg-white my-10 hover:shadow-md focus:bg-gray-200 focus:shadow-md"
          >
            Search book
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
