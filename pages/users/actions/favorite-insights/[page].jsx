import axios from "axios";
import { useState } from "react";
import WelcomeTop from "../../../../components/users/WelcomeTop";
import NoAccess from "../../../../components/users/NoAccess";
import NoItem from "../../../../components/users/NoItem";
import TileEntry from "../../../../components/books/TileEntry";
import SearchInput from "../../../../components/navigation/SearchInput";
import PageNavButton from "../../../../components/navigation/PageNavButton";

export const getServerSideProps = async (context) => {
  try {
    const userResp = await axios({
      method: "get",
      url: "http://localhost:3001/api/logged_in",
      headers: { cookie: context.req.headers.cookie },
    });

    const pageNum = context.query.page;

    const favTileEntries = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/fav_tile_entries?page=${pageNum}`,
      headers: { cookie: context.req.headers.cookie },
    });

    const upvotedEntries = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/upvoted_entries`,
      headers: { cookie: context.req.headers.cookie },
    });

    const downvotedEntries = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/downvoted_entries`,
      headers: { cookie: context.req.headers.cookie },
    });

    return {
      props: {
        favInsights: favTileEntries.data.tile_entries,
        pagy: favTileEntries.data.pagy,
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
  entriesUp,
  entriesDown,
}) => {
  const [insights, setInsights] = useState(favInsights);
  const [upvotedEntries, setUpvotedEntries] = useState(entriesUp);
  const [downvotedEntries, setDownvotedEntries] = useState(entriesDown);

  // methods related to like/heart functionalities
  const removeInsightFromState = (insight) => {
    const newInsights = insights.filter((el) => el.id !== insight.id);
    setInsights(newInsights);
  };

  const addInsightToState = (insight) => {
    setInsights([...insights, insight]);
  };

  // methods related to upvote and downvote functionalities
  const removeUpEntryFromState = (entry) => {
    entry.upvotes -= 1;
    const newUpvotedEntries = upvotedEntries.filter((el) => el.id !== entry.id);
    setUpvotedEntries(newUpvotedEntries);
  };

  const addUpEntryToState = (entry) => {
    entry.upvotes += 1;
    setUpvotedEntries([...upvotedEntries, entry]);
  };

  const removeDownEntryFromState = (entry) => {
    entry.downvotes -= 1;
    const newDownvotedEntries = downvotedEntries.filter(
      (el) => el.id !== entry.id
    );
    setDownvotedEntries(newDownvotedEntries);
  };

  const addDownEntryToState = (entry) => {
    entry.downvotes += 1;
    setDownvotedEntries([...downvotedEntries, entry]);
  };

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
          {insights.map((insight) => {
            return (
              <div key={insight.id} className="w-4/5 mx-auto my-10">
                <TileEntry
                  data={insight}
                  showTitle={true}
                  userId={userState.user.id}
                  insights={insights}
                  addInsightToState={addInsightToState}
                  removeInsightFromState={removeInsightFromState}
                  isLogged={userState.isLogged}
                  upvotedEntries={upvotedEntries}
                  downvotedEntries={downvotedEntries}
                  removeUpEntryFromState={removeUpEntryFromState}
                  addUpEntryToState={addUpEntryToState}
                  removeDownEntryFromState={removeDownEntryFromState}
                  addDownEntryToState={addDownEntryToState}
                />
              </div>
            );
          })}

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

export default FavoriteInsights;
