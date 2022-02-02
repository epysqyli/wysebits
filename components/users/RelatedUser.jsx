import {
  User,
  BookOpen,
  AlignCenter,
  UserMinus,
  UserPlus,
} from "react-feather";
import axios from "axios";
import Link from "next/dist/client/link";
import Image from "next/dist/client/image";
import { countTotalInsights } from "../../lib/creatorMethods";
import { addFollowedUserToState } from "../../lib/tileEntryMethods";
import { removeFollowedUserFromState } from "../../lib/tileEntryMethods";
import { isFollowed } from "../../lib/followMethods";

const RelatedUser = ({
  relatedUser,
  relatedUsers,
  setRelatedUsers,
  userId,
}) => {
  const follow = (e) => {
    e.stopPropagation();

    axios
      .post(
        `http://localhost:3001/api/users/${userId}/follow/${relatedUser.id}`,
        {},
        { withCredentials: true }
      )
      .then((res) =>
        addFollowedUserToState(relatedUser, relatedUsers, setRelatedUsers)
      )
      .catch((err) => console.log(err));
  };

  const unfollow = (e) => {
    e.stopPropagation();

    axios
      .post(
        `http://localhost:3001/api/users/${userId}/unfollow/${relatedUser.id}`,
        {},
        { withCredentials: true }
      )
      .then((res) =>
        removeFollowedUserFromState(relatedUser, relatedUsers, setRelatedUsers)
      )
      .catch((err) => console.log(err));
  };

  return (
    <Link href={`/creators/${relatedUser.username}`}>
      <div className="flex justify-around items-center gap-x-10">
        {relatedUser.avatar_url !== null ? (
          <Image
            src={relatedUser.avatar_url}
            className="animate-show-up-slow rounded-full"
            layout="fixed"
            width="60"
            height="60"
          />
        ) : (
          <User
            size={60}
            strokeWidth={1.5}
            color="gray"
            className="bg-gray-300 rounded-full p-2"
          />
        )}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="text-2xl font-bold text-gray-700">
              {relatedUser.username}
            </div>
            {isFollowed(relatedUsers, relatedUser) ? (
              <div
                onClick={unfollow}
                className="text-gray-700 hover:scale-110 transition-transform active:scale-125 cursor-pointer"
              >
                <UserMinus size={18} strokeWidth={1.75} />
              </div>
            ) : (
              <div
                onClick={follow}
                className="text-gray-700 hover:scale-110 transition-transform active:scale-125 cursor-pointer"
              >
                <UserPlus size={18} strokeWidth={1.75} />
              </div>
            )}
          </div>
          <div className="flex text-gray-700 gap-x-10">
            <div className="flex gap-x-3 items-center">
              <BookOpen color="gray" />
              <div className="text-sm">
                {relatedUser.book_tiles.length} books
              </div>
            </div>
            <div className="flex gap-x-3 items-center">
              <AlignCenter color="gray" />
              <div className="text-sm">
                {countTotalInsights(relatedUser.book_tiles)} insights
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RelatedUser;
