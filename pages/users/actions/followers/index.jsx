import IconAndTitle from "../../../../components/layout/IconAndTitle";
import { useState } from "react";
import WelcomeTop from "../../../../components/users/WelcomeTop";
import NoAccess from "../../../../components/users/NoAccess";
import Pagination from "../../../../components/navigation/Pagination";
import RelatedUser from "../../../../components/users/RelatedUser";
import { isLogged } from "../../../../lib/auth";
import { getLoggedUser, getFollowers, getAllFollowers } from "../../../../lib/serverSideMethods";
import ExploreMore from "../../../../components/navigation/ExploreMore";

export const getServerSideProps = async (context) => {
  if (isLogged(context)) {
    const pageNum = context.query.page;
    const loggedUser = await getLoggedUser(context);

    const [followers, unpagedFollowers] = await Promise.all([
      getFollowers(loggedUser, context, pageNum),
      getAllFollowers(loggedUser, context)
    ]);

    return {
      props: {
        followers: followers.data.followers,
        unpagedFollowers: unpagedFollowers.data,
        pagy: followers.data.pagy
      }
    };
  } else {
    return {
      props: {
        error: error.message
      }
    };
  }
};

const Followers = ({ followers, userState, pagy, unpagedFollowers }) => {
  const [followerUsers, setFollowerUsers] = useState(unpagedFollowers);
  const clientUrl = "/users/actions/following";

  if (userState.isLogged && followers.length == 0)
    return (
      <div className='pt-10 lg:pt-16'>
        <IconAndTitle title='Your followers' />

        <WelcomeTop text='Users following you' bcgImg='bg-followers' />
        <ExploreMore
          message='You have no followers yet!'
          body="Keep sharing your knowledge for the books you've read in order to provide the community with your insights!"
        />
      </div>
    );

  if (userState.isLogged && followers.length !== 0)
    return (
      <div className='pt-10 lg:pt-16'>
        <IconAndTitle title='Your followers' />

        <WelcomeTop text='Your followers' bcgImg='bg-followers' />
        <div className='py-16 w-11/12 lg:w-4/5 xl:w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto'>
          {followers.map((user) => {
            return (
              <div
                key={user.id}
                className='shadow-md rounded-md py-5 bg-gray-50 hover:bg-gray-100 hover:shadow-lg active:shadow-inner cursor-pointer'
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
      </div>
    );

  return <NoAccess />;
};

export default Followers;
