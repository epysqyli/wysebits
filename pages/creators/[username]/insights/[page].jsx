import { Meh } from "react-feather";
import { useState } from "react";
import { getUser, getUserEntries } from "../../../../lib/serverSideMethods";
import Pagination from "../../../../components/navigation/Pagination";
import TileEntry from "../../../../components/books/TileEntry";

import {
  getAllFollowing,
  getLoggedUser,
  getAllFavBooks,
  getAllFavEntries,
  getUpvotedEntries,
  getDownvotedEntries,
} from "../../../../lib/serverSideMethods";

export const getServerSideProps = async (context) => {
  const username = context.params.username;
  const pageNum = context.params.page;

  const user = await getUser(username);
  const entries = await getUserEntries(user, pageNum);
  const pagy = entries.data.pagy;

  try {
    const loggedUser = await getLoggedUser(context);
    const following = await getAllFollowing(loggedUser, context);
    const favInsights = await getAllFavEntries(loggedUser, context);
    const upvotedEntries = await getUpvotedEntries(loggedUser, context);
    const downvotedEntries = await getDownvotedEntries(loggedUser, context);

    if (entries.data.entries.length !== 0) {
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
          username: username,
          pagy: entries.data.pagy,
          following: following.data,
        },
      };
    }
  } catch (error) {
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
      <div>
        <div className="bg-saved-tiles bg-cover bg-center shadow">
          <div className="bg-gray-800 bg-opacity-70 text-white text-2xl md:text-3xl font-bold text-center py-12">
            <div className="mx-auto w-4/5">All insights from {username}</div>
          </div>
        </div>

        <div className="mt-10 w-4/5 md:w-3/5 mx-auto grid gap-y-10 lg:w-4/5 lg:grid-cols-2 lg:gap-x-6">
          {entries.map((entry) => {
            return (
              <div
                key={entry.id}
                className="bg-white text-justify leading-6 shadow rounded-md hover:shadow-md transition-all"
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
      <div>
        <div className="bg-saved-tiles bg-cover bg-center shadow">
          <div className="bg-gray-800 bg-opacity-70 text-white text-2xl md:text-3xl font-bold text-center py-12">
            <div className="mx-auto w-4/5">All insights from {username}</div>
          </div>
        </div>

        <div className="mx-auto w-4/5 text-center mt-20 text-xl">
          <div className="mx-auto w-min mb-20 animate-bounce">
            <Meh
              size={48}
              color="gray"
              strokeWidth={1.75}
              className="animate-spin"
            />
          </div>
          <div className="md:w-3/5 mx-auto lg:w-2/5">
            {username} is yet to publish contributions to the books he or she
            has read
          </div>
        </div>
      </div>
    );
};

export default UserInsights;
