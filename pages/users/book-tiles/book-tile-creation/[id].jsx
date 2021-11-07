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
  return (
    <div className="w-4/5 mx-auto my-20">
      <div className="flex justify-between p-2 border bg-gray-100 rounded-md shadow-sm">
        <img
          className="w-2/6 rounded-md bg-gray-200"
          src={`https://covers.openlibrary.org/w/olid/${book.ol_key}-M.jpg`}
        />
        <div className="w-3/6">
          <div className="text-xl mb-5 font-medium">{book.title}</div>
          <div className="text-sm">{book.category.name}</div>
          <div className="text-sm italic">
            {book.authors[0] ? book.authors[0].full_name : "No authors found"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBookTile;