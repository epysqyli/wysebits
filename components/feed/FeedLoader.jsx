const FeedLoader = ({ nextPage, favCatsNextPage, followingNextPage, currentSelection }) => {
  const btn = (
    <div className='text-center py-3 shadow-md rounded-md bg-white cursor-pointer hover:bg-gray-200 active:shadow-inner'>
      Load more insights
    </div>
  );

  if ((nextPage !== null && currentSelection === "guest_feed") || currentSelection === "user_feed")
    return btn;

  if (favCatsNextPage !== null && currentSelection === "categories_feed") return btn;

  if (followingNextPage !== null && currentSelection === "following_feed") return btn;

  return null;
};

export default FeedLoader;
