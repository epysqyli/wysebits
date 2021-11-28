import WelcomeTop from "../../../components/users/WelcomeTop";
import NoAccess from "../../../components/users/NoAccess";
import NoItem from "../../../components/users/NoItem";
import axios from "axios";

export const getServerSideProps = async (context) => {
  try {
    const userResp = await axios({
      method: "get",
      url: "http://localhost:3001/api/logged_in",
      headers: { cookie: context.req.headers.cookie },
    });

    const favTileEntries = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/fav_tile_entries`,
      headers: { cookie: context.req.headers.cookie },
    });
    return {
      props: { insights: favTileEntries.data },
    };
  } catch (error) {
    return {
      props: {
        insights: null,
      },
    };
  }
};

const FavoriteInsights = ({ userState, insights }) => {
  if (userState.isLogged) {
    if (insights.length == 0) {
      return (
        <div>
          <WelcomeTop firstLine="Your favorite insights" />
          <NoItem itemType="favorite insights" />
        </div>
      );
    } else {
      return (
        <div>
          <WelcomeTop firstLine="Your favorite insights" />
        </div>
      );
    }
  } else {
    return <NoAccess />;
  }
};

export default FavoriteInsights;
