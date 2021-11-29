import WelcomeTop from "../../../components/users/WelcomeTop";
import NoAccess from "../../../components/users/NoAccess";
import NoItem from "../../../components/users/NoItem";
import TileEntry from "../../../components/books/TileEntry";
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
          <WelcomeTop text="Your favorite insights" bcgImg="bg-saved-tiles" />
          <NoItem itemType="favorite insights" />
        </div>
      );
    } else {
      return (
        <div>
          <WelcomeTop text="Your favorite insights" bcgImg="bg-saved-tiles" />
          {insights.map((insight) => {
            return (
              <div
                key={insight.id}
                className="w-4/5 mx-auto my-10"
              >
                <TileEntry data={insight} showTitle={true} />
              </div>
            );
          })}
        </div>
      );
    }
  } else {
    return <NoAccess />;
  }
};

export default FavoriteInsights;
