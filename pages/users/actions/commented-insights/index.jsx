import { useState } from "react";
import WelcomeTop from "../../../../components/users/WelcomeTop";
import NoAccess from "../../../../components/users/NoAccess";
import NoItem from "../../../../components/users/NoItem";
import TileEntry from "../../../../components/books/TileEntry";
import SearchInput from "../../../../components/navigation/SearchInput";
import Pagination from "../../../../components/navigation/Pagination";
import {
  getLoggedUser,
  getAllFollowing,
  getUpvotedEntries,
  getDownvotedEntries,
  getUserCommentedEntries,
} from "../../../../lib/serverSideMethods";

export const getServerSideProps = async (context) => {
  try {
    const pageNum = context.query.page;

    const loggedUser = await getLoggedUser(context);
    const following = await getAllFollowing(loggedUser, context);
    const userCommentedEntries = await getUserCommentedEntries(
      loggedUser,
      pageNum
    );
    const upvotedEntries = await getUpvotedEntries(loggedUser, context);
    const downvotedEntries = await getDownvotedEntries(loggedUser, context);

    return {
      props: {
        pagy: userCommentedEntries.data.pagy,
        userCommentedEntries: userCommentedEntries.data.entries,
        following: following.data,
        entriesUp: upvotedEntries.data.upvoted_entries,
        entriesDown: downvotedEntries.data.downvoted_entries,
      },
    };
  } catch (error) {
    return {
      props: {
        userCommentedEntries: null,
      },
    };
  }
};

const CommentedInsights = ({
  userState,
  userCommentedEntries,
  pagy,
  following,
  entriesUp,
  entriesDown,
}) => {
  const [followedUsers, setFollowedUsers] = useState(following);
  const [insights, setInsights] = useState(
    userCommentedEntries.filter((entry) => entry !== null)
  );
  const [upvotedEntries, setUpvotedEntries] = useState(entriesUp);
  const [downvotedEntries, setDownvotedEntries] = useState(entriesDown);

  const clientUrl = "/users/actions/commented-insights";

  if (userState.isLogged && insights.length == 0)
    return (
      <>
        <WelcomeTop text="Insights you have commented" bcgImg="bg-comments" />
        <div className="mx-auto w-11/12 md:w-4/6 lg:w-3/6 xl:w-2/6 2xl:w-1/3 py-20 lg:py-40 2xl:py-48">
          <NoItem message="You have no favorite insights yet" />
          <div className="border px-5 pt-3 md:px-8 md:pt-5 mt-20 lg:mt-32 bg-gray-50 rounded-md shadow group transition-all hover:shadow-md text-center">
            <div>
              You can add insights to your favorite ones simply by hitting the
              heart on an insight of choice.
              <br /> Start exploring books now
            </div>
            <div className="mt-10 mb-3">
              <SearchInput
                pageDest="/books/search/"
                placeholder="Any book in mind?"
                searchMode="books"
              />
            </div>
          </div>
        </div>
      </>
    );

  if (userState.isLogged && insights.length !== 0)
    return (
      <>
        <WelcomeTop text="Insights you have commented" bcgImg="bg-comments" />
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
      </>
    );

  return <NoAccess />;
};

export default CommentedInsights;
