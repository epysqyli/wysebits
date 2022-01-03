import {
  User,
  BookOpen,
  AlignCenter,
  Users,
  UserPlus,
  UserMinus,
} from "react-feather";
import axios from "axios";
import { countTotalInsights } from "../../lib/creatorMethods";
import { isFollowed } from "../../lib/followMethods";
import {
  removeFollowedUserFromState,
  addFollowedUserToState,
} from "../../lib/tileEntryMethods";

const BasicInfo = ({ user, following, setFollowedUsers, userState }) => {
  const follow = () => {
    axios
      .post(
        `http://localhost:3001/api/users/${userState.user.id}/follow/${user.id}`,
        {},
        { withCredentials: true }
      )
      .then((res) => addFollowedUserToState(user, following, setFollowedUsers))
      .catch((err) => console.log(err));
  };

  const unfollow = () => {
    axios
      .post(
        `http://localhost:3001/api/users/${userState.user.id}/unfollow/${user.id}`,
        {},
        { withCredentials: true }
      )
      .then((res) =>
        removeFollowedUserFromState(user, following, setFollowedUsers)
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="md:flex items-center mt-4">
      <div className="flex justify-around items-center gap-x-5">
        <div className="flex items-center gap-x-5">
          <User
            size={60}
            strokeWidth={1.5}
            color="gray"
            className="bg-gray-300 rounded-full p-2"
          />
          {isFollowed(following, user) ? (
            <div
              className="cursor-pointer hover:scale-110 text-gray-600"
              onClick={() => unfollow()}
            >
              <UserMinus size={24} />
            </div>
          ) : (
            <div
              className="cursor-pointer hover:scale-110 text-gray-600"
              onClick={() => follow()}
            >
              <UserPlus size={24} />
            </div>
          )}
        </div>
        <div>
          <div className="text-5xl font-bold text-gray-700">
            {user.username}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-around mt-5 md:block">
        <div className="flex items-center gap-x-2">
          <BookOpen />
          <div className="text-gray-700">
            {user.book_tiles.length} books read
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <AlignCenter />
          <div className="text-gray-700">
            {countTotalInsights(user.book_tiles)} total insights
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <Users />
          <div className="text-gray-700">{user.followers.length} followers</div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
