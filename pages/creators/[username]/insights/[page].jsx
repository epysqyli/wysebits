import { useState } from "react";
import { getUser, getUserEntries } from "../../../../lib/serverSideMethods";
import PageNavButton from "../../../../components/navigation/PageNavButton";
import TileEntry from "../../../../components/books/TileEntry";

import {
  getAllFollowing,
  getLoggedUser,
  getFavBooks,
  getFavEntries,
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
    const favBooks = await getFavBooks(loggedUser, context);
    const favInsights = await getFavEntries(loggedUser, context);
    const upvotedEntries = await getUpvotedEntries(loggedUser, context);
    const downvotedEntries = await getDownvotedEntries(loggedUser, context);

    if (entries.length != 0) {
      return {
        props: {
          username: username,
          entries: entries.data.entries,
          favBooks: favBooks.data.books,
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
          entries: entries,
          username: username,
          favBooks: favBooks.data.books,
          pagy: entries.data.pagy,
          following: following.data,
        },
      };
    }
  } catch (error) {
    if (entries.length != 0) {
      return {
        props: {
          entries: entries,
          favBooks: [],
          pagy: pagy,
        },
      };
    } else {
      return {
        props: {
          entries: entries,
          favBooks: [],
          pagy: pagy,
        },
      };
    }
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
        <div className="my-10 w-4/5 md:w-3/5 mx-auto grid gap-y-10 lg:w-4/5 lg:grid-cols-2 lg:gap-x-6">
          {entries.map((entry) => {
            return (
              <div key={entry.id}>
                <TileEntry
                  data={entry}
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
        <div className="flex items-center my-16 w-4/5 md:w-4/6 mx-auto gap-x-4">
          <div className="w-1/2">
            <PageNavButton
              btnText="Previous page"
              url={pagy.prev_url}
              clientUrl={clientUrl}
            />
          </div>
          <div className="w-1/2">
            <PageNavButton
              btnText="Next page"
              url={pagy.next_url}
              clientUrl={clientUrl}
            />
          </div>
        </div>
      </div>
    );
};

export default UserInsights;
