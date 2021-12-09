import {
  ThumbsUp,
  ThumbsDown,
  Heart,
  ArrowUpRight,
  Users,
} from "react-feather";

const EntryLogged = ({
  data,
  insights,
  addInsightToState,
  removeInsightFromState,
}) => {
  const isFavInsight = () => {
    return insights.some((insight) => insight.id === data.id);
  };

  const addToFavInsights = () => {
    axios
      .post(
        `http://localhost:3001/api/users/${userId}/fav_tile_entries/${data.id}`,
        {},
        { withCredentials: true }
      )
      .then((res) => addInsightToState(data))
      .catch((err) => console.log(err));
  };

  const removeFromFavInsights = () => {
    axios
      .delete(
        `http://localhost:3001/api/users/${userId}/fav_tile_entries/${data.id}`,
        { withCredentials: true }
      )
      .then((res) => removeInsightFromState(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="shadow-md rounded-md">
      <div className="border-b-2 py-3 px-2">{data.content}</div>

      <div className="flex justify-between items-center text-sm px-2 py-2">
        <div className="flex justify-center gap-x-6">
          <div className="flex items-center gap-x-1 py-2">
            <div>{data.upvotes}</div>
            <div className="pb-1">
              <ThumbsUp size={16} />
            </div>
          </div>

          <div className="flex items-center gap-x-1">
            <div>{data.downvotes}</div>
            <div>
              <ThumbsDown size={16} />
            </div>
          </div>

          <div className="flex items-center">
            {isFavInsight() ? (
              <div onClick={() => removeFromFavInsights()}>
                <Heart
                  size={16}
                  fill="darkgray"
                  color="darkgray"
                  className="transition-all active:scale-125"
                />
              </div>
            ) : (
              <div onClick={() => addToFavInsights()}>
                <Heart
                  size={16}
                  color="darkgray"
                  className="transition-all active:scale-125"
                />
              </div>
            )}
          </div>
        </div>

        <div>{data.book_tile.user.username}</div>
      </div>
    </div>
  );
};

export default EntryLogged;
