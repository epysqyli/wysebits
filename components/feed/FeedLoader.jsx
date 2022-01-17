const FeedLoader = ({
  nextPage,
  favCatsNextPage,
  followingNextPage,
  currentSelection,
  getMoreEntries,
}) => {
  const btn = (
    <div
      className="text-center py-3 shadow-md rounded-md bg-white cursor-pointer hover:bg-gray-200 active:shadow-inner"
      onClick={getMoreEntries}
    >
      <div>Load more insights</div>
    </div>
  );

  if (nextPage !== null && currentSelection === "global") return btn;

  if (favCatsNextPage !== null && currentSelection === "favCats") return btn;

  if (followingNextPage !== null && currentSelection === "following")
    return btn;

  return null;
};

export default FeedLoader;
