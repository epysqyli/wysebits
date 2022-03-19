import {
  BookOpen,
  AlignCenter,
  Users,
  UserPlus,
  UserMinus,
  Send,
  ArrowUpRight,
} from "react-feather";

import Link from "next/dist/client/link";
import { countTotalInsights } from "../../lib/creatorMethods";

import { findOrCreateConversation } from "../../lib/conversationMethods";
import { useRouter } from "next/dist/client/router";

import {
  isFollowed,
  followAndUpdateState,
  unfollowAndUpdateState,
} from "../../lib/followMethods";

import Avatar from "../users/Avatar";

const BasicInfo = ({ user, following, setFollowedUsers, userState }) => {
  const router = useRouter();

  const redirectToConversation = (partner, conversationId) => {
    router.push(
      `/users/actions/conversations/${partner.username}-${conversationId}-${partner.id}`
    );
  };

  const sendMessage = async () => {
    const resp = await findOrCreateConversation(
      userState.user.id,
      user.user.id
    );
    redirectToConversation(resp.data.partner, resp.data.id);
  };

  return (
    <>
      <div className="md:flex items-center justify-around">
        <div className="flex justify-around items-center gap-x-5">
          <Avatar avatarUrl={user.user.avatar_url} size={60} />
          <div>
            <div className="text-5xl font-bold text-gray-100">
              {user.user.username}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-around mt-10 md:block">
          <Link
            href={{
              pathname: `/creators/[username]/books`,
              query: {
                username: user.user.username,
                page: 1,
              },
            }}
          >
            <div className="flex items-center gap-x-2 group p-1 cursor-pointer hover:shadow-md hover:rounded-md active:shadow-inner">
              <BookOpen size={20} />
              <div className="text-gray-200 md:text-gray-700">
                {user.book_tiles.length} books
              </div>
              <ArrowUpRight
                size={18}
                className="text-gray-600 group-hover:scale-125 group-active:scale-100 transition-transform hidden md:block"
              />
            </div>
          </Link>
          <Link
            href={{
              pathname: `/creators/[username]/insights`,
              query: {
                username: `${user.user.username}`,
                page: 1,
              },
            }}
          >
            <div className="flex items-center gap-x-2 group p-1 cursor-pointer hover:shadow-md hover:rounded-md active:shadow-inner">
              <AlignCenter size={20} />
              <div className="text-gray-200 md:text-gray-700">
                {countTotalInsights(user.book_tiles)} insights
              </div>
              <ArrowUpRight
                size={18}
                className="text-gray-600 group-hover:scale-125 group-active:scale-100 transition-transform hidden md:block"
              />
            </div>
          </Link>
          <Link href={`#`}>
            <div className="flex items-center gap-x-2">
              <Users size={20} />
              <div className="text-gray-200 md:text-gray-700">
                {user.followers.length} followers
              </div>
            </div>
          </Link>
        </div>
      </div>

      {userState.user.id === user.user.id ||
      userState.isLogged === false ? null : (
        <div className="flex justify-around items-center mt-10 mx-auto md:w-3/5 lg:w-2/5">
          {userState.isLogged && userState.user.id !== user.user.id ? (
            isFollowed(following, user.user) ? (
              <div
                onClick={() =>
                  unfollowAndUpdateState(
                    userState.user,
                    user.user,
                    following,
                    setFollowedUsers
                  )
                }
                className="flex items-center justify-center gap-x-5 cursor-pointer p-2 rounded-md shadow bg-white group active:shadow-inner"
              >
                <UserMinus
                  size={20}
                  className="text-gray-600 group-hover:scale-90 group-active:scale-75 transition-transform"
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
                    user.user,
                    following,
                    setFollowedUsers
                  )
                }
                className="flex items-center justify-center gap-x-5 cursor-pointer p-2 rounded-md shadow bg-white group active:shadow-inner"
              >
                <UserPlus
                  size={20}
                  className="text-gray-600 group-hover:scale-90 group-active:scale-75 transition-transform"
                />
                <div className="text-gray-700 group-hover:text-black">
                  Follow user
                </div>
              </div>
            )
          ) : null}

          <div
            onClick={sendMessage}
            className="flex items-center justify-center gap-x-5 cursor-pointer p-2 rounded-md shadow bg-white group active:shadow-inner"
          >
            <Send
              size={20}
              className="text-gray-600 group-hover:scale-90 group-active:scale-75 transition-transform"
            />
            <div className="text-gray-700 group-hover:text-black">
              Send Message
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BasicInfo;
