import { useState } from "react";
import WelcomeTop from "../../../../components/users/WelcomeTop";
import NoAccess from "../../../../components/users/NoAccess";
import SearchInput from "../../../../components/navigation/SearchInput";
import NoItem from "../../../../components/users/NoItem";
import RelatedUser from "../../../../components/users/RelatedUser";
import PageNavButton from "../../../../components/navigation/PageNavButton";
import { getLoggedUser, getFollowing, getAllFollowing } from "../../../../lib/serverSideMethods";

export const getServerSideProps = async (context) => {
  try {
    const pageNum = context.query.page;

    const loggedUser = await getLoggedUser(context);
    const following = await getFollowing(loggedUser, context, pageNum);
    const unpagedFollowing = await getAllFollowing(loggedUser, context);

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

  if (userState.isLogged) {
    if (following.length == 0) {
      return (
        <div>
          <WelcomeTop text="Users you are following" bcgImg="bg-following" />
          <div className="w-4/5 mx-auto">
            <NoItem message="You are not following anybody yet!" />
            <div className="border px-5 py-3 bg-gray-100 rounded-md shadow group transition-all cursor-pointer hover:shadow-md">
              <div>
                Start exploring books so that you can follow the insight
                contributors that you like the most!
                <br /> Start exploring books now
              </div>
              <div className="mt-10 mb-3">
                <SearchInput
                  pageDest="/books/search/"
                  placeholder="Any book in mind?"
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <WelcomeTop text="Users you are following" bcgImg="bg-following" />
          <div className="mt-10 w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
            {following.map((user) => {
              return (
                <div
                  key={user.id}
                  className="shadow-md rounded-md py-5 bg-gray-100 hover:bg-gray-200 hover:shadow-lg active:shadow-inner cursor-pointer"
                >
                  <RelatedUser
                    relatedUser={user.followed}
                    userId={userState.user.id}
                    relatedUsers={followedUsers}
                    setRelatedUsers={setFollowedUsers}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-around my-16 md:w-4/5 mx-auto">
            <div className="w-1/3">
              <PageNavButton
                btnText="Previous page"
                clientUrl={clientUrl}
                url={pagy.prev_url}
              />
            </div>
            <div className="w-1/3">
              <PageNavButton
                btnText="Next page"
                clientUrl={clientUrl}
                url={pagy.next_url}
              />
            </div>
          </div>
        </div>
      );
    }
  } else {
    return <NoAccess />;
  }
};

export default Following;
