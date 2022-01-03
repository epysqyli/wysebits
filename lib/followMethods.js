import axios from "axios";

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

const follow = async (user, otherUser) => {
  await axios.post(
    `http://localhost:3001/api/users/${user.id}/follow/${otherUser.id}`,
    {},
    { withCredentials: true }
  );
};

const unfollow = async (user, otherUser) => {
  await axios.post(
    `http://localhost:3001/api/users/${user.id}/unfollow/${otherUser.id}`,
    {},
    { withCredentials: true }
  );
};

const followAndUpdateState = async (
  user,
  otherUser,
  followedUsers,
  setState
) => {
  await follow(user, otherUser);
  addFollowedUserToState(otherUser, followedUsers, setState);
};

const unfollowAndUpdateState = async (
  user,
  otherUser,
  followedUsers,
  setState
) => {
  await unfollow(user, otherUser);
  removeFollowedUserFromState(otherUser, followedUsers, setState);
};

export {
  isFollowed,
  followAndUpdateState,
  unfollowAndUpdateState
};
