const HomeTileEntry = ({entry}) => {
  return (
    <div className="w-3/5">
      <div className="text-xl">{entry.book_tile.book.title}</div>
      <p className="mt-5 text-justify">{entry.content.split(' ').slice(0, 30).join(' ')} ...</p>
      <div className="flex justify-between mt-5 pt-2 border-t">
        <span className="text-sm">Posted by: {entry.book_tile.user.name}</span>
        <span className="text-sm">{entry.book_tile.book.category.name}</span>
      </div>
    </div>
  );
};

export default HomeTileEntry;
