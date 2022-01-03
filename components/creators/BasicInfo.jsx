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
    <div>
      <div className="md:flex items-center justify-around mt-4">
        <div className="flex justify-around items-center gap-x-5">
          <User
            size={60}
            strokeWidth={1.5}
            color="gray"
            className="bg-gray-300 rounded-full p-2"
          />
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
            <div className="text-gray-700">
              {user.followers.length} followers
            </div>
          </div>
        </div>
      </div>

      {isFollowed(following, user) ? (
        <div
          onClick={() => unfollow()}
          className="flex items-center justify-center gap-x-5 mx-auto cursor-pointer w-2/5 md:w-1/5 mt-10 py-1 rounded-md shadow bg-white group active:shadow-inner"
        >
          <UserMinus
            size={20}
            className="hover:scale-110 text-gray-600 group-hover:scale-110 transition-transform"
          />
          <div className="text-gray-700 group-hover:text-black">
            Unfollow user
          </div>
        </div>
      ) : (
        <div
          onClick={() => follow()}
          className="flex items-center justify-center gap-x-5 mx-auto cursor-pointer w-2/5 mt-10 py-1 rounded-md shadow bg-white group active:shadow-inner"
        >
          <UserPlus
            size={20}
            className="hover:scale-110 text-gray-600 group-hover:scale-110 transition-transform"
          />
          <div className="text-gray-700 group-hover:text-black">
            Follow user
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicInfo;
