import { useState } from "react";
import WelcomeTop from "../../../../components/users/WelcomeTop";
import NoAccess from "../../../../components/users/NoAccess";
import RelatedUser from "../../../../components/users/RelatedUser";
import Pagination from "../../../../components/navigation/Pagination";
import { isLogged } from "../../../../lib/auth";
import {
  getLoggedUser,
  getFollowing,
  getAllFollowing,
} from "../../../../lib/serverSideMethods";
import ExploreMore from "../../../../components/navigation/ExploreMore";

export const getServerSideProps = async (context) => {
  if (isLogged(context)) {
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
  } else {
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
        <ExploreMore
          message="You are not following anybody yet!"
          body="Start exploring books so that you can follow the insight contributors that you like the most!"
          exortation="Start exploring books now!"
        />
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
