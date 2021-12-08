import axios from "axios";
import WelcomeTop from "../../../components/users/WelcomeTop";
import SearchInput from "../../../components/navigation/SearchInput";
import NoItem from "../../../components/users/NoItem";
import NoAccess from "../../../components/users/NoAccess";

export const getServerSideProps = async (context) => {
  try {
    const userResp = await axios({
      method: "get",
      url: "http://localhost:3001/api/logged_in",
      headers: { cookie: context.req.headers.cookie },
    });

    const resp = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/followers`,
      headers: { cookie: context.req.headers.cookie },
    });

    return {
      props: {
        followers: resp.data,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

const Followers = ({ followers, userState }) => {
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
          <div className="mx-auto w-4/5 mt-20">
            <div className="text-center text-gray-500">
              List followers in a decent way
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
