import { useState } from "react";
import WelcomeTop from "../../../../components/users/WelcomeTop";
import NoAccess from "../../../../components/users/NoAccess";
import SearchInput from "../../../../components/navigation/SearchInput";
import NoItem from "../../../../components/users/NoItem";
import RelatedUser from "../../../../components/users/RelatedUser";
import Pagination from "../../../../components/navigation/Pagination";

import {
  getLoggedUser,
  getFollowing,
  getAllFollowing,
} from "../../../../lib/serverSideMethods";

export const getServerSideProps = async (context) => {
  try {
    const pageNum = context.query.page;
    const loggedUser = await getLoggedUser(context);

    const [following, unpagedFollowing] = await Promise.all([
      getFollowing(loggedUser, context, pageNum),
      getAllFollowing(loggedUser, context),
    ]);

    return {
      props: {
        following: following.data.following,
        unpagedFollowing: unpagedFollowing.data,
        pagy: following.data.pagy,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }
};

const Following = ({ following, userState, pagy, unpagedFollowing }) => {
  const [followedUsers, setFollowedUsers] = useState(unpagedFollowing);
  const clientUrl = "/users/actions/following";

  if (userState.isLogged && following.length == 0)
    return (
      <div className="pt-10 lg:pt-16">
        <WelcomeTop text="Users you are following" bcgImg="bg-following" />
        <div className="mx-auto w-4/5 md:w-4/6 lg:w-3/6 xl:w-2/6 2xl:w-1/3 py-20 lg:py-40 2xl:py-48">
          <NoItem message="You are not following anybody yet!" />
          <div className="border px-5 pt-3 md:px-8 md:pt-5 mt-20 lg:mt-32 bg-gray-50 rounded-md shadow group transition-all hover:shadow-md text-center">
            <div>
              Start exploring books so that you can follow the insight
              contributors that you like the most!
              <br /> Start exploring books now
            </div>
            <div className="mt-10 mb-3">
              <SearchInput
                pageDest="/books/search/"
                placeholder="Any book in mind?"
                searchMode="books"
              />
            </div>
          </div>
        </div>
      </div>
    );

  if (userState.isLogged && following.length !== 0) {
    return (
      <div className="pt-10 lg:pt-16">
        <WelcomeTop text="Users you are following" bcgImg="bg-following" />
        <div className="py-16 w-11/12 lg:w-4/5 xl:w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
          {following.map((user) => {
            return (
              <div
                key={user.id}
                className="shadow-md rounded-md py-5 bg-gray-50 hover:bg-gray-200 hover:shadow-lg active:shadow-inner cursor-pointer"
              >
                <RelatedUser
                  relatedUser={user.followed}
                  user={userState.user}
                  relatedUsers={followedUsers}
                  setRelatedUsers={setFollowedUsers}
                />
              </div>
            );
          })}
        </div>

        <Pagination clientUrl={clientUrl} pagy={pagy} />
      </div>
    );
  }

  return <NoAccess />;
};

export default Following;
