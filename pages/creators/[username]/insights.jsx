import { Meh } from "react-feather";
import { useState } from "react";
import { getUser, getUserEntries } from "../../../lib/serverSideMethods";
import Pagination from "../../../components/navigation/Pagination";
import TileEntry from "../../../components/books/TileEntry";
import { isLogged } from "../../../lib/auth";

import {
  getAllFollowing,
  getLoggedUser,
  getAllFavEntries,
  getUpvotedEntries,
  getDownvotedEntries,
} from "../../../lib/serverSideMethods";
import WelcomeTop from "../../../components/users/WelcomeTop";
import IconAndTitle from "../../../components/layout/IconAndTitle";

export const getServerSideProps = async (context) => {
  const username = context.params.username;
  const pageNum = context.query.page;

  const user = await getUser(username);
  const entries = await getUserEntries(user, pageNum);
  const pagy = entries.data.pagy;

  if (isLogged(context)) {
    const loggedUser = await getLoggedUser(context);
    const [following, favInsights, upvotedEntries, downvotedEntries] =
      await Promise.all([
        getAllFollowing(loggedUser, context),
        getAllFavEntries(loggedUser, context),
        getUpvotedEntries(loggedUser, context),
        getDownvotedEntries(loggedUser, context),
      ]);

    return {
      props: {
        username: username,
        entries: entries.data.entries,
        pagy: pagy,
        following: following.data,
        favInsights: favInsights.data.tile_entries,
        entriesUp: upvotedEntries.data.upvoted_entries,
        entriesDown: downvotedEntries.data.downvoted_entries,
      },
    };
  } else {
    return {
      props: {
        entries: entries.data.entries,
        pagy: pagy,
        username: username,
      },
    };
  }
};

const UserInsights = ({
  following,
  favInsights,
  entriesUp,
  entriesDown,
  entries,
  pagy,
  username,
  userState,
}) => {
  const [followedUsers, setFollowedUsers] = useState(following);
  const [insights, setInsights] = useState(favInsights);
  const [upvotedEntries, setUpvotedEntries] = useState(entriesUp);
  const [downvotedEntries, setDownvotedEntries] = useState(entriesDown);

  const clientUrl = `/creators/${username}/insights`;

  if (entries.length !== 0)
    return (
      <div className="py-10 lg:py-16">
        <IconAndTitle title={`Insights by ${username}`}/>
        <WelcomeTop bcgImg="bg-saved-tiles" text={`All insights from ${username}`} />

        <div className="mt-10 w-11/12 md:w-3/5 mx-auto grid gap-y-10 lg:w-4/5 lg:grid-cols-2 lg:gap-x-6">
          {entries.map((entry) => {
            return (
              <div
                key={entry.id}
                className="bg-white text-justify leading-6 shadow rounded-md hover:shadow-md transition-all min-h-24rem"
              >
                <TileEntry
                  entryProp={entry}
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
                  showTitle={true}
                />
              </div>
            );
          })}
        </div>

        <Pagination clientUrl={clientUrl} pagy={pagy} />
      </div>
    );

  if (entries.length === 0)
    return (
      <div className="py-10 lg:py-16">
        <IconAndTitle title={`Insights by ${username}`}/>
        <WelcomeTop bcgImg="bg-saved-tiles" text={`All insights from ${username}`} />

        <div className="mx-auto w-11/12 text-center my-20 text-xl">
          <div className="mx-auto w-min mb-20 animate-bounce">
            <Meh
              size={48}
              color="white"
              strokeWidth={1.75}
              className="animate-spin"
            />
          </div>
          <div className="md:w-3/5 mx-auto lg:w-2/5 text-gray-50">
            {username} is yet to publish contributions to the books he or she
            has read
          </div>
        </div>
      </div>
    );
};

export default UserInsights;
