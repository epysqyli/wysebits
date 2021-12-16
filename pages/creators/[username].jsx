import axios from "axios";
import { useState } from "react";
import BasicInfo from "../../components/creators/BasicInfo";
import LatestBooks from "../../components/creators/LatestBooks";
import LatestEntries from "../../components/creators/LatestEntries";

export const getServerSideProps = async (context) => {
  const username = context.query.username;

  const user = await axios.get(`http://localhost:3001/api/users/${username}`);

  try {
    const userResp = await axios({
      method: "get",
      url: "http://localhost:3001/api/logged_in",
      headers: { cookie: context.req.headers.cookie },
    });

    const favBooks = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/fav_books`,
      headers: { cookie: context.req.headers.cookie },
    });

    const favInsights = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/fav_tile_entries`,
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
        user: user.data,
        favBooks: favBooks.data.books,
        favInsights: favInsights.data.tile_entries,
        entriesUp: upvotedEntries.data.upvoted_entries,
        entriesDown: downvotedEntries.data.downvoted_entries,
      },
    };
  } catch (error) {
    return {
      props: { user: user.data },
    };
  }
};

const Username = ({
  user,
  userState,
  favBooks,
  favInsights,
  entriesUp,
  entriesDown,
}) => {
  const [latestEntries, setLatestEntries] = useState(
    user.book_tiles.map((book_tile) => book_tile.tile_entries[0]).slice(0, 3)
  );

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

  return (
    <div>
      <div>
        <BasicInfo user={user} />
      </div>

      <div className="mt-10">
        <LatestBooks books={user.book_tiles.map((tile) => tile.book)} />
      </div>

      <div className="mt-10">
        <LatestEntries
          entries={latestEntries}
          userState={userState}
          insights={insights}
          favBooks={favBooks}
          addInsightToState={addInsightToState}
          removeInsightFromState={removeInsightFromState}
          upvotedEntries={upvotedEntries}
          downvotedEntries={downvotedEntries}
          removeDownEntryFromState={removeDownEntryFromState}
          addUpEntryToState={addUpEntryToState}
          removeUpEntryFromState={removeUpEntryFromState}
          addDownEntryToState={addDownEntryToState}
        />
      </div>
    </div>
  );
};

export default Username;
