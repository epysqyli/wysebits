import {
  User,
  BookOpen,
  AlignCenter,
  Users,
  UserPlus,
  UserMinus,
  ArrowUpRight,
} from "react-feather";

import Link from "next/dist/client/link";
import { countTotalInsights } from "../../lib/creatorMethods";

import {
  isFollowed,
  followAndUpdateState,
  unfollowAndUpdateState,
} from "../../lib/followMethods";

const BasicInfo = ({ user, following, setFollowedUsers, userState }) => {
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
              {user.user.username}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-around mt-5 md:block">
          <Link href={`/creators/${user.user.username}/books/1`}>
            <div className="flex items-center gap-x-2 group cursor-pointer">
              <BookOpen size={20} />
              <div className="text-gray-700">
                {user.book_tiles.length} books read
              </div>
              <ArrowUpRight
                size={18}
                className="text-gray-600 group-hover:scale-125 group-active:scale-100 transition-transform"
              />
            </div>
          </Link>
          <Link href={`#`}>
            <div className="flex items-center gap-x-2 group cursor-pointer">
              <AlignCenter size={20} />
              <div className="text-gray-700">
                {countTotalInsights(user.book_tiles)} total insights
              </div>
              <ArrowUpRight
                size={18}
                className="text-gray-600 group-hover:scale-125 group-active:scale-100 transition-transform"
              />
            </div>
          </Link>
          <Link href={`#`}>
            <div className="flex items-center gap-x-2">
              <Users size={20} />
              <div className="text-gray-700">
                {user.followers.length} followers
              </div>
            </div>
          </Link>
        </div>
      </div>

      {userState.user.id !== user.user.id ? (
        isFollowed(following, user.user) ? (
          <div
            onClick={() =>
              unfollowAndUpdateState(
                userState.user,
                user,
                following,
                setFollowedUsers
              )
            }
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
            onClick={() =>
              followAndUpdateState(
                userState.user,
                user,
                following,
                setFollowedUsers
              )
            }
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
        )
      ) : null}
    </div>
  );
};

export default BasicInfo;
