import {
  User,
  BookOpen,
  AlignCenter,
  UserPlus,
  UserMinus,
} from "react-feather";
import axios from "axios";
import Link from "next/dist/client/link";
import { countTotalInsights } from "../../lib/creatorMethods";
import { removeFollowedUserFromState } from "../../lib/tileEntryMethods";

const RelatedUser = ({ relatedUser, followedUsers, setFollowedUsers, userId }) => {
  const unfollow = () => {
    axios
      .post(
        `http://localhost:3001/api/users/${userId}/unfollow/${relatedUser.id}`,
        {},
        { withCredentials: true }
      )
      .then((res) =>
        removeFollowedUserFromState(
          relatedUser,
          followedUsers,
          setFollowedUsers
        )
      )
      .catch((err) => console.log(err));
  };

  return (
    <Link href={`/creators/${relatedUser.username}`}>
      <div className="flex justify-center items-center gap-x-10">
        <div>
          <User
            size={60}
            strokeWidth={1.5}
            color="gray"
            className="bg-gray-300 rounded-full p-2"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="text-2xl font-bold text-gray-700">
              {relatedUser.username}
            </div>
            <div
              onClick={() => unfollow()}
              className="text-gray-700 hover:scale-110 transition-transform active:scale-125 cursor-pointer"
            >
              <UserMinus size={18} strokeWidth={1.75} />
            </div>
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
