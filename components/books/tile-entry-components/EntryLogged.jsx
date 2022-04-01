import { useState } from "react";
import EntryActions from "./EntryActions";
import Comments from "./Comments";

const EntryLogged = ({
  entryProp,
  user,
  insights,
  setInsights,
  upvotedEntries,
  setUpvotedEntries,
  downvotedEntries,
  setDownvotedEntries,
  followedUsers,
  setFollowedUsers,
  feed,
}) => {
  const [commentsView, setCommentsView] = useState(false);
  const [comments, setComments] = useState([]);

  const showInsight = () => setCommentsView(false);
  const showComments = () => setCommentsView(true);

  if (feed === true)
    return (
      <div className="flex flex-col justify-around h-full min-h-24rem">
        <div className="lg:border-b-2 lg:border-l-2 rounded-bl py-5 px-10 md:px-16 font-light whitespace-pre-line flex-grow mt-10 mx-auto text-justify md:text-left lg:mt-0 lg:w-full">
          {commentsView ? <Comments comments={comments} /> : entryProp.content}
        </div>

        <EntryActions
          user={user}
          entryProp={entryProp}
          upvotedEntries={upvotedEntries}
          downvotedEntries={downvotedEntries}
          setUpvotedEntries={setUpvotedEntries}
          setDownvotedEntries={setDownvotedEntries}
          followedUsers={followedUsers}
          setFollowedUsers={setFollowedUsers}
          insights={insights}
          setInsights={setInsights}
          commentsView={commentsView}
          setComments={setComments}
          showInsight={showInsight}
          showComments={showComments}
          feed={feed}
        />
      </div>
    );

  return (
    <div className="flex flex-col justify-around h-full min-h-24rem">
      <div className="py-5 px-10 md:px-16 font-light whitespace-pre-line flex-grow">
        {commentsView ? <Comments comments={comments} /> : entryProp.content}
      </div>

      <EntryActions
        user={user}
        entryProp={entryProp}
        upvotedEntries={upvotedEntries}
        downvotedEntries={downvotedEntries}
        setUpvotedEntries={setUpvotedEntries}
        setDownvotedEntries={setDownvotedEntries}
        followedUsers={followedUsers}
        setFollowedUsers={setFollowedUsers}
        insights={insights}
        setInsights={setInsights}
        commentsView={commentsView}
        setComments={setComments}
        showInsight={showInsight}
        showComments={showComments}
      />
    </div>
  );
};

export default EntryLogged;
