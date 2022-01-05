import axios from "axios";

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

// methods related to upvote and downvote functionalities state only
const isUpvoted = (upvotedEntries, entryProp) => {
  return upvotedEntries.some((entry) => entry.id == entryProp.id);
};

const isDownvoted = (downvotedEntries, entryProp) => {
  return downvotedEntries.some((entry) => entry.id == entryProp.id);
};

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

// methods related to upvote and downvote functionalities api calls
const upvote = async (user, entry) => {
  await axios.post(
    `http://localhost:3001/api/users/${user.id}/tile_entries/${entry.id}/upvote`,
    {},
    { withCredentials: true }
  );
};

const removeUpvote = async (user, entry) => {
  await axios.post(
    `http://localhost:3001/api/users/${user.id}/tile_entries/${entry.id}/remove_upvote`,
    {},
    { withCredentials: true }
  );
};

const downvote = async (user, entry) => {
  await axios.post(
    `http://localhost:3001/api/users/${user.id}/tile_entries/${entry.id}/downvote`,
    {},
    { withCredentials: true }
  );
};

const removeDownvote = async (user, entry) => {
  await axios.post(
    `http://localhost:3001/api/users/${user.id}/tile_entries/${entry.id}/remove_downvote`,
    {},
    { withCredentials: true }
  );
};

// public wrappers around api calls and state management
const upvoteAndUpdateState = async (
  user,
  entry,
  upvotedEntries,
  downvotedEntries,
  setUpvoted,
  setDownvoted
) => {
  await upvote(user, entry);
  if (isDownvoted(downvotedEntries, entry))
    removeDownvoteAndUpdateState(user, entry, downvotedEntries, setDownvoted);
  addUpEntryToState(entry, upvotedEntries, setUpvoted);
};

const downvoteAndUpdateState = async (
  user,
  entry,
  upvotedEntries,
  downvotedEntries,
  setUpvoted,
  setDownvoted
) => {
  await downvote(user, entry);
  if (isUpvoted(upvotedEntries, entry))
    removeUpvoteAndUpdateState(user, entry, upvotedEntries, setUpvoted);
  addDownEntryToState(entry, downvotedEntries, setDownvoted);
};

const removeUpvoteAndUpdateState = async (
  user,
  entry,
  upvotedEntries,
  setState
) => {
  await removeUpvote(user, entry);
  removeUpEntryFromState(entry, upvotedEntries, setState);
};

const removeDownvoteAndUpdateState = async (
  user,
  entry,
  downvotedEntries,
  setState
) => {
  await removeDownvote(user, entry);
  removeDownEntryFromState(entry, downvotedEntries, setState);
};

export {
  isUpvoted,
  isDownvoted,
  upvoteAndUpdateState,
  downvoteAndUpdateState,
  removeUpvoteAndUpdateState,
  removeDownvoteAndUpdateState,
};
