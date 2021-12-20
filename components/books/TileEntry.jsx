import EntryLogged from "./tile-entry-components/EntryLogged";
import EntryGuest from "./tile-entry-components/EntryGuest";
import EntryLoggedTitle from "./tile-entry-components/EntryLoggedTitle";
import EntryGuestTitle from "./tile-entry-components/EntryGuestTitle";

const TileEntry = ({
  data,
  showTitle,
  userId,
  isLogged,
  insights,
  setInsights,
  upvotedEntries,
  setUpvotedEntries,
  downvotedEntries,
  setDownvotedEntries,
  followedUsers,
  setFollowedUsers,
}) => {
  if (isLogged && showTitle) {
    return (
      <EntryLoggedTitle
        data={data}
        userId={userId}
        insights={insights}
        setInsights={setInsights}
        upvotedEntries={upvotedEntries}
        setUpvotedEntries={setUpvotedEntries}
        downvotedEntries={downvotedEntries}
        setDownvotedEntries={setDownvotedEntries}
        followedUsers={followedUsers}
        setFollowedUsers={setFollowedUsers}
      />
    );
  }

  if (isLogged) {
    return (
      <div className="bg-white text-justify leading-6 shadow rounded-md hover:shadow-md transition-all">
        <EntryLogged
          data={data}
          userId={userId}
          insights={insights}
          setInsights={setInsights}
          upvotedEntries={upvotedEntries}
          setUpvotedEntries={setUpvotedEntries}
          downvotedEntries={downvotedEntries}
          setDownvotedEntries={setDownvotedEntries}
          followedUsers={followedUsers}
          setFollowedUsers={setFollowedUsers}
        />
      </div>
    );
  }

  if (!isLogged && showTitle) return <EntryGuestTitle data={data} />;

  return (
    <div className="bg-white text-justify leading-6 shadow rounded-md hover:shadow-md transition-all">
      <EntryGuest data={data} />
    </div>
  );
};

export default TileEntry;
