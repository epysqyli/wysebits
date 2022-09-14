import axios from "axios";

// methods related to follow and unfollow user
const isFollowed = (following, otherUser) => {
  return following.some((user) => user.id === otherUser.id);
};

const addFollowedUserToState = (newUserToFollow, followedUsers, setState) => {
  setState([...followedUsers, newUserToFollow]);
};

const removeFollowedUserFromState = (userToRemove, followedUsers, setState) => {
  const newFollowedUsers = followedUsers.filter((el) => el.id !== userToRemove.id);
  setState(newFollowedUsers);
};

const follow = async (user, otherUser) => {
  await axios({
    method: "POST",
    url: `${process.env.BASE_URL}/users/${user.id}/following/`,
    data: { other_user_id: otherUser.id },
    withCredentials: true
  });
};

const unfollow = async (user, otherUser) => {
  await axios({
    method: "DELETE",
    url: `${process.env.BASE_URL}/users/${user.id}/following/${otherUser.id}`,
    withCredentials: true
  });
};

const followAndUpdateState = async (user, otherUser, followedUsers, setState) => {
  await follow(user, otherUser);
  addFollowedUserToState(otherUser, followedUsers, setState);
};

const unfollowAndUpdateState = async (user, otherUser, followedUsers, setState) => {
  await unfollow(user, otherUser);
  removeFollowedUserFromState(otherUser, followedUsers, setState);
};

export { isFollowed, followAndUpdateState, unfollowAndUpdateState };
