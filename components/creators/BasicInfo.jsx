import { User, BookOpen, AlignCenter, Users } from "react-feather";
import { countTotalInsights } from "../../lib/creatorMethods";

const BasicInfo = ({ user }) => {
  return (
    <div className="md:flex justify-evenly items-center mt-2">
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
          <div className="text-gray-700">{user.followers.length} followers</div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
