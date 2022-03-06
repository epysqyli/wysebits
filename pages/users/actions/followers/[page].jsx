import { useState } from "react";
import WelcomeTop from "../../../../components/users/WelcomeTop";
import NoAccess from "../../../../components/users/NoAccess";
import SearchInput from "../../../../components/navigation/SearchInput";
import NoItem from "../../../../components/users/NoItem";
import RelatedUser from "../../../../components/users/RelatedUser";
import Pagination from "../../../../components/navigation/Pagination";
import {
  getLoggedUser,
  getFollowers,
  getAllFollowers,
} from "../../../../lib/serverSideMethods";

export const getServerSideProps = async (context) => {
  try {
    const pageNum = context.query.page;

    const loggedUser = await getLoggedUser(context);
    const followers = await getFollowers(loggedUser, context, pageNum);
    const unpagedFollowers = await getAllFollowers(loggedUser, context);

    return {
      props: {
        followers: followers.data.followers,
        unpagedFollowers: unpagedFollowers.data,
        pagy: followers.data.pagy,
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

const Followers = ({ followers, userState, pagy, unpagedFollowers }) => {
  const [followerUsers, setFollowerUsers] = useState(unpagedFollowers);
  const clientUrl = "/users/actions/following";

  if (userState.isLogged && followers.length == 0)
    return (
      <>
        <WelcomeTop text="Users following you" bcgImg="bg-followers" />
        <div className="mx-auto w-4/5 md:w-4/6 lg:w-3/6 xl:w-2/6 2xl:w-1/3 py-20 lg:py-40 2xl:py-48">
          <NoItem message="You have no followers yet!" />
          <div className="border px-5 pt-5 mt-20 lg:mt-32 bg-gray-50 rounded-md shadow group transition-all hover:shadow-md">
            <div>
              Keep sharing your knowledge for the books you've read in order to
              provide the community with your insights!
            </div>
            <div className="mt-10 mb-3">
              <SearchInput
                pageDest="/users/book-search/"
                placeholder="Any book in mind?"
              />
            </div>
          </div>
        </div>
      </>
    );

  if (userState.isLogged && followers.length !== 0)
    return (
      <>
        <WelcomeTop text="Your followers" bcgImg="bg-followers" />
        <div className="py-16 w-11/12 lg:w-4/5 xl:w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
          {followers.map((user) => {
            return (
              <div
                key={user.id}
                className="shadow-md rounded-md py-5 bg-gray-50 hover:bg-gray-100 hover:shadow-lg active:shadow-inner cursor-pointer"
              >
                <RelatedUser
                  relatedUser={user.follower}
                  userId={userState.user.id}
                  relatedUsers={followerUsers}
                  setRelatedUsers={setFollowerUsers}
                />
              </div>
            );
          })}
        </div>

        <Pagination clientUrl={clientUrl} pagy={pagy} />
      </>
    );

  return <NoAccess />;
};

export default Followers;
