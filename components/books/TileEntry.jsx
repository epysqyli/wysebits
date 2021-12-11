import EntryLogged from "./tile-entry-components/EntryLogged";
import EntryGuest from "./tile-entry-components/EntryGuest";
import EntryLoggedTitle from "./tile-entry-components/EntryLoggedTitle";
import EntryGuestTitle from "./tile-entry-components/EntryGuestTitle";

const TileEntry = ({
  data,
  showTitle,
  userId,
  insights,
  addInsightToState,
  removeInsightFromState,
  isLogged,
  upvotedEntries,
  downvotedEntries,
  removeUpEntryFromState,
  addUpEntryToState,
  removeDownEntryFromState,
  addDownEntryToState,
}) => {
  if (isLogged && showTitle) {
    return (
      <EntryLoggedTitle
        data={data}
        insights={insights}
        addInsightToState={addInsightToState}
        removeInsightFromState={removeInsightFromState}
        userId={userId}
      />
    );
  }

  if (isLogged) {
    return (
      <div className="bg-white text-justify leading-6 shadow rounded-md hover:shadow-md transition-all">
        <EntryLogged
          data={data}
          insights={insights}
          addInsightToState={addInsightToState}
          removeInsightFromState={removeInsightFromState}
          userId={userId}
          upvotedEntries={upvotedEntries}
          downvotedEntries={downvotedEntries}
          removeUpEntryFromState={removeUpEntryFromState}
          addUpEntryToState={addUpEntryToState}
          removeDownEntryFromState={removeDownEntryFromState}
          addDownEntryToState={addDownEntryToState}
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
