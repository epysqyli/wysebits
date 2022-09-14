import Link from "next/link";
import Avatar from "../users/Avatar";
import Banner from "./Banner";

const TrendingUser = ({ user }) => {
  return (
    <Link href={`/creators/${user.username}`}>
      <div className='cursor-pointer'>
        <Banner text='User' iconProp='user' />
        <div className='border rounded-md py-5 lg:py-10 mt-5 bg-gray-50'>
          <div className='mt-2 w-min mx-auto'>
            <Avatar avatarUrl={user.avatar_url} size={60} />
          </div>
          <div className='w-1/2 mx-auto my-5 text-center text-lg lg:text-xl'>
            <span className='font-bold'>{user.username}</span> is the most prolific user
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TrendingUser;
