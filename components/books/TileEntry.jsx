import EntryLogged from "./tile-entry-components/EntryLogged";
import EntryGuest from "./tile-entry-components/EntryGuest";
import EntryLoggedTitle from "./tile-entry-components/EntryLoggedTitle";
import EntryGuestTitle from "./tile-entry-components/EntryGuestTitle";

const TileEntry = ({
  entryProp,
  showTitle,
  user,
  isLogged,
  insights,
  setInsights,
  upvotedEntries,
  setUpvotedEntries,
  downvotedEntries,
  setDownvotedEntries,
  followedUsers,
  setFollowedUsers,
  feed
}) => {
  if (isLogged && showTitle) {
    return (
      <EntryLoggedTitle
        entryProp={entryProp}
        user={user}
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
      <EntryLogged
        entryProp={entryProp}
        user={user}
        insights={insights}
        setInsights={setInsights}
        upvotedEntries={upvotedEntries}
        setUpvotedEntries={setUpvotedEntries}
        downvotedEntries={downvotedEntries}
        setDownvotedEntries={setDownvotedEntries}
        followedUsers={followedUsers}
        setFollowedUsers={setFollowedUsers}
        feed={feed}
      />
    );
  }

  if (isLogged == false && showTitle) return <EntryGuestTitle entryProp={entryProp} />;

  return <EntryGuest entryProp={entryProp} feed={feed} />;
};

export default TileEntry;
