import Head from "next/head";
import { Meh } from "react-feather";
import { useState } from "react";
import { getUser, getUserEntries } from "../../../lib/serverSideMethods";
import Pagination from "../../../components/navigation/Pagination";
import TileEntry from "../../../components/books/TileEntry";

import {
  getAllFollowing,
  getLoggedUser,
  getAllFavEntries,
  getUpvotedEntries,
  getDownvotedEntries,
} from "../../../lib/serverSideMethods";
import WelcomeTop from "../../../components/users/WelcomeTop";

export const getServerSideProps = async (context) => {
  const username = context.params.username;
  const pageNum = context.query.page;

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
      <>
        <Head>
          <title>Insights by {username}</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <div className="bg-saved-tiles bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto">
          <div className="bg-gray-800 bg-opacity-70 text-white text-4xl font-bold text-center py-16 lg:rounded-md">
            <div className="mx-auto w-4/5">All insights from {username}</div>
          </div>
        </div>

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
      </>
    );

  if (entries.length === 0)
    return (
      <>
        <Head>
          <title>Insights by {username}</title>
          <link rel="icon" href="/logo.png" />
        </Head>

        <WelcomeTop
          bcgImg="bg-saved-tiles"
          text={`All insights from ${username}`}
        />

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
      </>
    );
};

export default UserInsights;
