import EntryGuestTitle from "../books/tile-entry-components/EntryGuestTitle";
import EntryLoggedTitle from "../books/tile-entry-components/EntryLoggedTitle";

const LatestEntries = ({
  entries,
  userState,
  insights,
  setInsights,
  upvotedEntries,
  setUpvotedEntries,
  downvotedEntries,
  setDownvotedEntries,
  followedUsers,
  setFollowedUsers,
}) => {
  if (userState.isLogged) {
    return (
      <div>
        <div className="text-center text-gray-800 text-3xl">
          Latest insights
        </div>
        <div className="w-5/6 md:w-3/4 mx-auto mt-10">
          {entries.map((entry) => (
            <div className="my-10" key={entry.id}>
              <EntryLoggedTitle
                data={entry}
                userId={userState.user.id}
                insights={insights}
                upvotedEntries={upvotedEntries}
                downvotedEntries={downvotedEntries}
                setInsights={setInsights}
                upvotedEntries={upvotedEntries}
                setUpvotedEntries={setUpvotedEntries}
                downvotedEntries={downvotedEntries}
                setDownvotedEntries={setDownvotedEntries}
                followedUsers={followedUsers}
                setFollowedUsers={setFollowedUsers}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="text-center text-gray-800 text-3xl">
          Latest insights
        </div>
        <div className="w-5/6 md:w-3/4 mx-auto mt-10">
          {entries.map((entry) => {
            return (
              <div className="m-10" key={entry.id}>
                <EntryGuestTitle data={entry} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default LatestEntries;
