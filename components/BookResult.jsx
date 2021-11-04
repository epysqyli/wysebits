const BookResult = ({ bookData }) => {
  return (
    <div className="border rounded-md shadow-sm my-10 px-3 py-5">
      <div className="flex justify-between">
        <img
          className="w-2/6"
          src={`https://covers.openlibrary.org/w/olid/${bookData._source.ol_key}-M.jpg`}
        />
        <div className="ml-5">
          <div className="text-xl">{bookData._source.title}</div>
          <div>{bookData._source.category.name}</div>
          <div>
            {bookData._source.authors.length
              ? bookData._source.authors[0].full_name
              : "No authors found"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookResult;
