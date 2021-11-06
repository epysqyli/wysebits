export const getStaticProps = async () => {
  const resp = await fetch("http://localhost:3001/api/categories");
  const categories = await resp.json();

  return {
    props: {
      categories: categories.data,
    },
  };
};

const CreateBook = ({ categories }) => {
  return (
    <div className="w-4/5 mx-auto my-20 pb-10">
      <div className="text-2xl font-medium text-center">
        Fill in the required fields to create a book entry
      </div>

      <form action="http://localhost:3001/api/books" method="post" className="py-5">
        <div className="my-5">
          <label htmlFor="title" className="pl-3">
            Enter the book title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="border-none bg-white w-full mt-2 rounded-md focus:ring-0"
            placeholder="Book title"
            required
          />
        </div>

        <div className="my-5">
          <label htmlFor="title" className="pl-3">
            Choose a category
          </label>
          <select
            name="category"
            id="category"
            className="border-none bg-white w-full mt-2 rounded-md focus:ring-0"
            defaultValue={categories[24].id}
            required
          >
            {categories.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-3/5 mx-auto block border mt-10 mb-5 py-2 rounded-md shadow-sm hover:shadow-md hover:bg-gray-100 active:bg-gray-200 active:shadow-lg"
        >
          Create the book
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
