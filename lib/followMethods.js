// methods related to follow and unfollow user
const isFollowed = (following, otherUser) => {
  return following.some((user) => user.id === otherUser.id);
};

const addFollowedUserToState = (newUserToFollow, followedUsers, setState) => {
  setState([...followedUsers, newUserToFollow]);
};

const removeFollowedUserFromState = (userToRemove, followedUsers, setState) => {
  const newFollowedUsers = followedUsers.filter(
    (el) => el.id !== userToRemove.id
  );
  setState(newFollowedUsers);
};

export { isFollowed, addFollowedUserToState, removeFollowedUserFromState };
