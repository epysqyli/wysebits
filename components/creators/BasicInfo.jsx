import { User, BookOpen, AlignCenter } from "react-feather";

const BasicInfo = ({ user }) => {
  return (
    <div>
      <div className="flex justify-around items-center py-5 px-10">
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

      <div className="flex items-center justify-around mt-5">
        <div className="flex items-center gap-x-2">
          <BookOpen />
          <div className="text-gray-700">
            {user.book_tiles.length} books read
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <AlignCenter />
          <div className="text-gray-700">
            {user.book_tiles.length * 3} total insights
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
