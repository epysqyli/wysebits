import { useState } from "react";
import WelcomeTop from "../../../../components/users/WelcomeTop";
import NoAccess from "../../../../components/users/NoAccess";
import TileEntry from "../../../../components/books/TileEntry";
import Pagination from "../../../../components/navigation/Pagination";
import { isLogged } from "../../../../lib/auth";
import IconAndTitle from "../../../../components/layout/IconAndTitle";

import {
  getLoggedUser,
  getAllFollowing,
  getUpvotedEntries,
  getDownvotedEntries,
  getUserCommentedEntries,
  getAllFavEntries
} from "../../../../lib/serverSideMethods";
import ExploreMore from "../../../../components/navigation/ExploreMore";

export const getServerSideProps = async (context) => {
  if (isLogged(context)) {
    const pageNum = context.query.page;
    const loggedUser = await getLoggedUser(context);

    const [following, userCommentedEntries, upvotedEntries, downvotedEntries, favEntries] = await Promise.all(
      [
        getAllFollowing(loggedUser, context),
        getUserCommentedEntries(loggedUser, pageNum),
        getUpvotedEntries(loggedUser, context),
        getDownvotedEntries(loggedUser, context),
        getAllFavEntries(loggedUser, context)
      ]
    );

    return {
      props: {
        pagy: userCommentedEntries.data.pagy,
        userCommentedEntries: userCommentedEntries.data.entries,
        following: following.data,
        entriesUp: upvotedEntries.data.upvoted_entries,
        entriesDown: downvotedEntries.data.downvoted_entries,
        favEntries: favEntries.data.tile_entries
      }
    };
  } else {
    return {
      props: {
        userCommentedEntries: null
      }
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
  favEntries
}) => {
  const [followedUsers, setFollowedUsers] = useState(following);
  const [insights, setInsights] = useState(favEntries.filter((entry) => entry !== null));
  const [upvotedEntries, setUpvotedEntries] = useState(entriesUp);
  const [downvotedEntries, setDownvotedEntries] = useState(entriesDown);

  const clientUrl = "/users/actions/commented-insights";

  if (userState.isLogged && userCommentedEntries.length == 0)
    return (
      <div className='pt-10 lg:pt-16'>
        <IconAndTitle title='Insights you have commented' />

        <WelcomeTop text='Insights you have commented' bcgImg='bg-comments' />
        <ExploreMore
          message='You have not commented any insights yet'
          body="You can comments other users' insights by clicking on the comment icon"
          exortation='Start exploring books now!'
        />
      </div>
    );

  if (userState.isLogged && userCommentedEntries.length !== 0)
    return (
      <div className='pt-10 lg:pt-16'>
        <IconAndTitle title='Insights you have commented' />

        <WelcomeTop text='Insights you have commented' bcgImg='bg-comments' />
        <div className='py-10 w-11/12 md:w-3/5 mx-auto grid gap-y-10 lg:w-4/5 lg:grid-cols-2 lg:gap-x-6'>
          {userCommentedEntries.map((insight) => {
            return (
              <div
                key={insight.id}
                className='bg-white text-justify leading-6 shadow rounded-md hover:shadow-md transition-all min-h-24rem'
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

export default CommentedInsights;
