import WelcomeTop from "../../../components/users/WelcomeTop";
import NoAccess from "../../../components/users/NoAccess";
import SearchInput from "../../../components/navigation/SearchInput";
import NoItem from "../../../components/users/NoItem";
import axios from "axios";

export const getServerSideProps = async (context) => {
  try {
    const userResp = await axios({
      method: "get",
      url: "http://localhost:3001/api/logged_in",
      headers: { cookie: context.req.headers.cookie },
    });

    const resp = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/following`,
      headers: { cookie: context.req.headers.cookie },
    });

    return {
      props: {
        following: resp.data,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

const Following = ({ following, userState }) => {
  if (userState.isLogged) {
    if (following) {
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
        </div>
      );
    }
  } else {
    return <NoAccess />;
  }
};

export default Following;
