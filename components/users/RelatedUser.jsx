import { BookOpen, AlignCenter, UserMinus, UserPlus } from "react-feather";
import Link from "next/dist/client/link";
import { countTotalInsights } from "../../lib/creatorMethods";
import { isFollowed, followAndUpdateState, unfollowAndUpdateState } from "../../lib/followMethods";
import Avatar from "../../components/users/Avatar";

const RelatedUser = ({ relatedUser, relatedUsers, setRelatedUsers, user }) => {
  const follow = (e) => {
    e.stopPropagation();
    followAndUpdateState(user, relatedUser, relatedUsers, setRelatedUsers);
  };

  const unfollow = (e) => {
    e.stopPropagation();
    unfollowAndUpdateState(user, relatedUser, relatedUsers, setRelatedUsers);
  };

  return (
    <Link href={`/creators/${relatedUser.username}`}>
      <div className='flex justify-around items-center gap-x-10'>
        <Avatar avatarUrl={relatedUser.avatar_url} size={60} />
        <div>
          <div className='flex items-center justify-between mb-5'>
            <div className='text-2xl font-bold text-gray-700'>{relatedUser.username}</div>
            {isFollowed(relatedUsers, relatedUser) ? (
              <div
                onClick={unfollow}
                className='text-gray-700 hover:scale-110 transition-transform active:scale-125 cursor-pointer'
              >
                <UserMinus size={18} strokeWidth={1.75} />
              </div>
            ) : (
              <div
                onClick={follow}
                className='text-gray-700 hover:scale-110 transition-transform active:scale-125 cursor-pointer'
              >
                <UserPlus size={18} strokeWidth={1.75} />
              </div>
            )}
          </div>
          <div className='flex text-gray-700 gap-x-10'>
            <div className='flex gap-x-3 items-center'>
              <BookOpen color='gray' />
              <div className='text-sm'>{relatedUser.book_tiles.length} books</div>
            </div>
            <div className='flex gap-x-3 items-center'>
              <AlignCenter color='gray' />
              <div className='text-sm'>{countTotalInsights(relatedUser.book_tiles)} insights</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RelatedUser;
