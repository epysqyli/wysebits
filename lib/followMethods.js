// methods related to follow and unfollow user
const isFollowed = (following, otherUser) => {
  return following.some((user) => user.id === otherUser.id);
};

export { isFollowed };
