const BookResult = ({ bookData }) => {
  return (
    <div className="border rounded-md shadow-sm my-10 px-5">
      <div className="text-xl text-center">{bookData._source.title}</div>
      <div className="flex justify-around mt-5">
        <div>{bookData._source.category.name}</div>
        <div className="text-right">
          {bookData._source.authors.length
            ? bookData._source.authors[0].full_name
            : "No authors found"}
        </div>
      </div>
    </div>
  );
};

export default BookResult;
