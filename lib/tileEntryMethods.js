// Import in EntryLogged component

// methods related to like/heart functionalities
const removeInsightFromState = (insight, insights, setState) => {
  const newInsights = insights.filter((el) => el.id !== insight.id);
  setState(newInsights);
};

const addInsightToState = (insight, insights, setState) => {
  setState([...insights, insight]);
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

// methods related to following users
const addFollowedUserToState = (newUserToFollow, followedUsers, setState) => {
  setState([...followedUsers, newUserToFollow]);
};

const removeFollowedUserFromState = (userToRemove, followedUsers, setState) => {
  const newFollowedUsers = followedUsers.filter(
    (el) => el.id !== userToRemove.id
  );
  setState(newFollowedUsers);
};

export {
  removeInsightFromState,
  addInsightToState,
  removeUpEntryFromState,
  addUpEntryToState,
  removeDownEntryFromState,
  addDownEntryToState,
  addFollowedUserToState,
  removeFollowedUserFromState,
};
