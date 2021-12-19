import axios from "axios";
import WelcomeTop from "../../../../components/users/WelcomeTop";
import NoAccess from "../../../../components/users/NoAccess";
import SearchInput from "../../../../components/navigation/SearchInput";
import NoItem from "../../../../components/users/NoItem";
import FollowedUser from "../../../../components/users/FollowedUser";
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
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/following?page=${pageNum}`,
      headers: { cookie: context.req.headers.cookie },
    });

    return {
      props: {
        following: resp.data.following,
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

const Following = ({ following, userState, pagy }) => {
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
          <div className="mx-auto w-4/5 mt-10">
            {following.map((user) => {
              return (
                <div
                  key={user.id}
                  className="my-10 shadow-md rounded-md py-5 bg-gray-100 hover:bg-gray-200 hover:shadow-lg active:bg-gray-300 cursor-pointer"
                >
                  <FollowedUser followedUser={user.followed} />
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

export default Following;
