import IconAndTitle from "../../../../components/layout/IconAndTitle";
import { useState } from "react";
import WelcomeTop from "../../../../components/users/WelcomeTop";
import NoAccess from "../../../../components/users/NoAccess";
import TileEntry from "../../../../components/books/TileEntry";
import Pagination from "../../../../components/navigation/Pagination";
import { isLogged } from "../../../../lib/auth";
import {
  getLoggedUser,
  getAllFollowing,
  getFavEntries,
  getUpvotedEntries,
  getDownvotedEntries,
} from "../../../../lib/serverSideMethods";
import ExploreMore from "../../../../components/navigation/ExploreMore";

export const getServerSideProps = async (context) => {
  if (isLogged(context)) {
    const pageNum = context.query.page;
    const loggedUser = await getLoggedUser(context);

    const [following, favTileEntries, upvotedEntries, downvotedEntries] =
      await Promise.all([
        getAllFollowing(loggedUser, context),
        getFavEntries(loggedUser, context, pageNum),
        getUpvotedEntries(loggedUser, context),
        getDownvotedEntries(loggedUser, context),
      ]);

    return {
      props: {
        pagy: favTileEntries.data.pagy,
        favInsights: favTileEntries.data.tile_entries,
        following: following.data,
        entriesUp: upvotedEntries.data.upvoted_entries,
        entriesDown: downvotedEntries.data.downvoted_entries,
      },
    };
  } else {
    return {
      props: {
        favInsights: null,
      },
    };
  }
};

const FavoriteInsights = ({
  userState,
  favInsights,
  pagy,
  following,
  entriesUp,
  entriesDown,
}) => {
  const [followedUsers, setFollowedUsers] = useState(following);
  const [insights, setInsights] = useState(
    favInsights.filter((insight) => insight !== null)
  );
  const [upvotedEntries, setUpvotedEntries] = useState(entriesUp);
  const [downvotedEntries, setDownvotedEntries] = useState(entriesDown);

  const clientUrl = "/users/actions/favorite-insights";

  if (userState.isLogged && insights.length == 0)
    return (
      <div className="pt-10 lg:pt-16">
        <IconAndTitle title="Favorite insights"/>
        
        <WelcomeTop text="Your favorite insights" bcgImg="bg-saved-tiles" />
        <ExploreMore
          message="You have no favorite insights yet"
          body="You can add insights to your favorite ones simply by hitting the heart on an insight of choice."
          exortation="Start exploring books now!"
        />
      </div>
    );

  if (userState.isLogged && insights.length !== 0)
    return (
      <div className="pt-10 lg:pt-16">
        <IconAndTitle title="Favorite insights"/>

        <WelcomeTop text="Your favorite insights" bcgImg="bg-saved-tiles" />
        <div className="py-10 w-11/12 md:w-3/5 mx-auto grid gap-y-10 lg:w-4/5 lg:grid-cols-2 lg:gap-x-6">
          {insights.map((insight) => {
            return (
              <div
                key={insight.id}
                className="bg-white text-justify leading-6 shadow rounded-md hover:shadow-md transition-all min-h-24rem"
              >
                <TileEntry
                  entryProp={insight}
                  showTitle={true}
                  user={userState.user}
                  isLogged={userState.isLogged}
                  insights={insights}
                  setInsights={setInsights}
                  upvotedEntries={upvotedEntries}
                  setUpvotedEntries={setUpvotedEntries}
                  downvotedEntries={downvotedEntries}
                  setDownvotedEntries={setDownvotedEntries}
                  followedUsers={followedUsers}
                  setFollowedUsers={setFollowedUsers}
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

export default FavoriteInsights;
