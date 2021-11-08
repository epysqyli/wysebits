export const getServerSideProps = async ({ params }) => {
  const req = await fetch(`http://localhost:3001/api/books/${params.id}`);
  const res = await req.json();

  return {
    props: {
      book: res.data,
    },
  };
};

const CreateBookTile = ({ book }) => {
  const olSrc = `https://covers.openlibrary.org/w/olid/${book.ol_key}-M.jpg`;
  const dbSrc = book.cover_url;

  const coverImage = (
    <img
      className="w-2/6 rounded-md bg-gray-200 object-cover"
      src={dbSrc || olSrc || ""}
    />
  );

  return (
    <div>
      <div className="w-4/5 mx-auto mt-20 mb-10">
        <div className="flex justify-between p-2 border bg-gray-100 rounded-md shadow-sm">
          {coverImage}

          <div className="w-3/6">
            <div className="text-xl mb-5 font-medium">{book.title}</div>
            <div className="text-sm">{book.category.name}</div>
            <div className="text-sm italic">
              {book.authors[0] ? book.authors[0].full_name : "No authors found"}
            </div>
          </div>
        </div>
      </div>

      <div className="text-2xl text-center mb-10 py-3 bg-gray-200">
        <div className="bg-gray-100 w-4/5 mx-auto rounded py-2 px-2 shadow-md">
          Share the top 3 takeaways with the world!
        </div>
      </div>

      <div className="w-4/5 mx-auto my-10">
        <form>{/* form creates a book tile and posts the tile-entries */}</form>
      </div>
    </div>
  );
};

export default CreateBookTile;
