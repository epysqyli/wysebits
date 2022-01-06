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
        <div className="my-10 w-4/5 md:w-3/5 mx-auto grid gap-y-10 lg:w-4/5 lg:grid-cols-2 lg:gap-x-6">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white text-justify leading-6 shadow rounded-md hover:shadow-md transition-all"
            >
              <EntryLoggedTitle
                entryProp={entry}
                user={userState.user}
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
        <div className="my-10 w-4/5 md:w-3/5 mx-auto grid gap-y-10 lg:w-4/5 lg:grid-cols-2 lg:gap-x-6">
          {entries.map((entry) => {
            return (
              <div key={entry.id}>
                <EntryGuestTitle entryProp={entry} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default LatestEntries;
