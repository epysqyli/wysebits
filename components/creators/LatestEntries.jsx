import EntryGuestTitle from "../books/tile-entry-components/EntryGuestTitle";
import EntryLoggedTitle from "../books/tile-entry-components/EntryLoggedTitle";

const LatestEntries = ({
  entries,
  userState,
  insights,
  addInsightToState,
  removeInsightFromState,
  upvotedEntries,
  downvotedEntries,
  removeUpEntryFromState,
  addUpEntryToState,
  removeDownEntryFromState,
  addDownEntryToState,
}) => {
  if (userState.isLogged) {
    return (
      <div>
        <div className="text-center text-gray-800 text-3xl">
          Latest insights
        </div>
        {entries.map((entry) => (
          <div className="m-10" key={entry.id}>
            <EntryLoggedTitle
              data={entry}
              insights={insights}
              addInsightToState={addInsightToState}
              removeInsightFromState={removeInsightFromState}
              userId={userState.user.id}
              upvotedEntries={upvotedEntries}
              downvotedEntries={downvotedEntries}
              removeUpEntryFromState={removeUpEntryFromState}
              addUpEntryToState={addUpEntryToState}
              removeDownEntryFromState={removeDownEntryFromState}
              addDownEntryToState={addDownEntryToState}
            />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <div className="text-center text-gray-800 text-3xl">
          Latest insights
        </div>
        {entries.map((entry) => {
          return (
            <div className="m-10" key={entry.id}>
              <EntryGuestTitle data={entry} />
            </div>
          );
        })}
      </div>
    );
  }
};

export default LatestEntries;
