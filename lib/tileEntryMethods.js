import axios from "axios";
// Import in EntryLogged component

// methods related to fav insights functionalities
const removeInsightFromState = (insight, insights, setState) => {
  const newInsights = insights.filter((el) => el.id !== insight.id);
  setState(newInsights);
};

const addInsightToState = (insight, insights, setState) => {
  setState([...insights, insight]);
};

const addToFavInsight = async (user, entry) => {
  await axios.post(
    `http://localhost:3001/api/users/${user.id}/fav_tile_entries/${entry.id}`,
    {},
    { withCredentials: true }
  );
};

const addToFavInsightAndUpdateState = async (
  user,
  entry,
  insights,
  setState
) => {
  await addToFavInsight(user, entry);
  addInsightToState(entry, insights, setState);
};

const removeFromFavInsights = async (user, entry) => {
  await axios.delete(
    `http://localhost:3001/api/users/${user.id}/fav_tile_entries/${entry.id}`,
    { withCredentials: true }
  );
};

const removeFromFavInsightsAndUpdateState = async (
  user,
  entry,
  insights,
  setState
) => {
  await removeFromFavInsights(user, entry);
  removeInsightFromState(entry, insights, setState);
};

// methods related to upvote and downvote functionalities
const removeUpEntryFromState = (entry, upvotedEntries, setState) => {
  entry.upvotes -= 1;
  const newUpvotedEntries = upvotedEntries.filter((el) => el.id !== entry.id);
  setState(newUpvotedEntries);
};

const addUpEntryToState = (entry, upvotedEntries, setState) => {
  entry.upvotes += 1;
  setState([...upvotedEntries, entry]);
};

const removeDownEntryFromState = (entry, downvotedEntries, setState) => {
  entry.downvotes -= 1;
  const newDownvotedEntries = downvotedEntries.filter(
    (el) => el.id !== entry.id
  );
  setState(newDownvotedEntries);
};

const addDownEntryToState = (entry, downvotedEntries, setState) => {
  entry.downvotes += 1;
  setState([...downvotedEntries, entry]);
};

export {
  removeUpEntryFromState,
  addUpEntryToState,
  removeDownEntryFromState,
  addDownEntryToState,
  addToFavInsightAndUpdateState,
  removeFromFavInsightsAndUpdateState
};
