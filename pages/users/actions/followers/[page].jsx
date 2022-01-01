import axios from "axios";
import { useState } from "react";
import WelcomeTop from "../../../../components/users/WelcomeTop";
import NoAccess from "../../../../components/users/NoAccess";
import SearchInput from "../../../../components/navigation/SearchInput";
import NoItem from "../../../../components/users/NoItem";
import RelatedUser from "../../../../components/users/RelatedUser";
import PageNavButton from "../../../../components/navigation/PageNavButton";

export const getServerSideProps = async (context) => {
  try {
    const userResp = await axios({
      method: "get",
      url: "http://localhost:3001/api/logged_in",
      headers: { cookie: context.req.headers.cookie },
    });

    const pageNum = context.query.page;

    const resp = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/followers?page=${pageNum}`,
      headers: { cookie: context.req.headers.cookie },
    });

    const unpagedFollowers = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/unpaged_followers`,
      headers: { cookie: context.req.headers.cookie },
    });

    return {
      props: {
        followers: resp.data.followers,
        unpagedFollowers: unpagedFollowers.data,
        pagy: resp.data.pagy,
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

  if (userState.isLogged) {
    if (followers.length == 0) {
      return (
        <div>
          <WelcomeTop text="Users following you" bcgImg="bg-followers" />
          <div className="w-4/5 mx-auto">
            <NoItem message="You have no followers yet!" />
            <div className="border px-5 py-3 bg-gray-100 rounded-md shadow group transition-all cursor-pointer hover:shadow-md">
              <div>
                Keep sharing your knowledge for the books you've read in order
                to provide the community with your insights!
              </div>
              <div className="mt-10 mb-3">
                <SearchInput
                  pageDest="/users/book-search/"
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
          <WelcomeTop text="Your followers" bcgImg="bg-followers" />
          <div className="mt-10 w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
            {followers.map((user) => {
              return (
                <div
                  key={user.id}
                  className="shadow-md rounded-md py-5 bg-gray-100 hover:bg-gray-200 hover:shadow-lg active:shadow-inner cursor-pointer"
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

          <div className="flex items-center my-16 w-4/5 mx-auto gap-x-4">
            <div className="w-1/2">
              <PageNavButton
                btnText="Previous page"
                clientUrl={clientUrl}
                url={pagy.prev_url}
              />
            </div>
            <div className="w-1/2">
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

export default Followers;
