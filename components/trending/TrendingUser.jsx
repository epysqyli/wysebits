import Link from "next/link";
import Avatar from "../users/Avatar";
import Banner from "./Banner";

const TrendingUser = ({ user }) => {
  return (
    <div>
      <Banner text="Weekly user with highest number of new insights" />
      <div className="flex justify-around border rounded-md py-4 mt-5 bg-gray-50">
        <div>
          <div className="mx-auto w-min mb-3">
            <Avatar avatarUrl={user.avatar_url} size={60} />
          </div>
          <Link href={`/creators/${user.username}`}>
            <span className="block text-center underline">Visit user page</span>
          </Link>
        </div>
        <div className="w-1/2">
          <span className="font-bold">{user.username}</span> is the most
          prolific user this week, posting new insights for{" "}
          {user.tiles_count_diff} books. Congrats!
        </div>
      </div>
    </div>
  );
};

export default TrendingUser;
