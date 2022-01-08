import axios from "axios";
import { useState } from "react";
import WelcomeTop from "../../../../components/users/WelcomeTop";
import NoAccess from "../../../../components/users/NoAccess";
import NoItem from "../../../../components/users/NoItem";
import TileEntry from "../../../../components/books/TileEntry";
import SearchInput from "../../../../components/navigation/SearchInput";
import PageNavButton from "../../../../components/navigation/PageNavButton";
import {
  getLoggedUser,
  getAllFollowing,
  getFavEntries,
  getUpvotedEntries,
  getDownvotedEntries,
} from "../../../../lib/serverSideMethods";

export const getServerSideProps = async (context) => {
  try {
    const pageNum = context.query.page;

    const loggedUser = await getLoggedUser(context);
    const following = await getAllFollowing(loggedUser, context);
    const favTileEntries = await getFavEntries(loggedUser, context, pageNum);
    const upvotedEntries = await getUpvotedEntries(loggedUser, context);
    const downvotedEntries = await getDownvotedEntries(loggedUser, context);

    return {
      props: {
        favInsights: favTileEntries.data.tile_entries,
        pagy: favTileEntries.data.pagy,
        following: following.data,
        entriesUp: upvotedEntries.data.upvoted_entries,
        entriesDown: downvotedEntries.data.downvoted_entries,
      },
    };
  } catch (error) {
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
  const [insights, setInsights] = useState(favInsights);
  const [upvotedEntries, setUpvotedEntries] = useState(entriesUp);
  const [downvotedEntries, setDownvotedEntries] = useState(entriesDown);

  const clientUrl = "/users/actions/favorite-insights";

  if (userState.isLogged) {
    if (insights.length == 0) {
      return (
        <div>
          <WelcomeTop text="Your favorite insights" bcgImg="bg-saved-tiles" />
          <div className="w-4/5 mx-auto">
            <NoItem message="You have no favorite insights yet" />
            <div className="border px-5 py-3 bg-gray-100 rounded-md shadow group transition-all cursor-pointer hover:shadow-md">
              <div>
                You can add insights to your favorite ones simply by hitting the
                heart on an insight of choice.
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
          <WelcomeTop text="Your favorite insights" bcgImg="bg-saved-tiles" />
          <div className="my-10 w-4/5 md:w-3/5 mx-auto grid gap-y-10 lg:w-4/5 lg:grid-cols-2 lg:gap-x-6">
            {insights.map((insight) => {
              return (
                <div
                  key={insight.id}
                  className="bg-white text-justify leading-6 shadow rounded-md hover:shadow-md transition-all"
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

          <div className="flex justify-around my-16 lg:my-32 md:w-4/5 lg:w-1/2 mx-auto">
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

export default FavoriteInsights;
