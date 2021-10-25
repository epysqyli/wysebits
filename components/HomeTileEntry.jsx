const HomeTileEntry = ({entry}) => {
  return (
    <>
      <div className="text-xl">{entry.book_tile.book.title}</div>
      <p className="mt-5">{entry.content}</p>
      <div className="flex justify-between mt-5">
        <span className="text-sm">Posted by: {entry.book_tile.user.name}</span>
        <span className="text-sm">{entry.book_tile.book.category.name}</span>
      </div>
    </>
  );
};

export default HomeTileEntry;
