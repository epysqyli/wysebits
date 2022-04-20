import { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageCircle, X } from "react-feather";
import { loadComments } from "../../../lib/commentsMethods";
import CreatorLink from "../../navigation/CreatorLink";
import Comments from "./Comments";

const EntryGuest = ({ entryProp, feed, userId, addOverlay, removeOverlay }) => {
  const [commentsView, setCommentsView] = useState(false);
  const [comments, setComments] = useState([]);

  const showInsight = () => setCommentsView(false);
  const showComments = () => setCommentsView(true);

  if (feed === true)
    return (
      <div className="flex flex-col justify-around h-full min-h-24rem">
        <div className="lg:border-b-2 lg:border-l-2 rounded-bl py-5 px-10 md:px-16 whitespace-pre-line font-light flex-grow mt-10 mx-auto text-justify md:text-left lg:mt-0 lg:w-full">
          {commentsView ? (
            <Comments
              comments={comments}
              addOverlay={addOverlay}
              removeOverlay={removeOverlay}
            />
          ) : (
            entryProp.content
          )}
        </div>

        <div className="flex justify-between items-center text-sm px-10 md:px-16 py-4 lg:bg-gray-100 border-b-2 lg:border-none">
          <div className="flex justify-center items-center gap-x-3">
            <ThumbsUp size={16} color="gray" strokeWidth={1.75} />
            <div className="text-gray-600">{entryProp.net_votes}</div>
            <ThumbsDown size={16} color="gray" strokeWidth={1.75} />
          </div>

          <div className="flex items-center">
            {commentsView ? (
              <X
                size={16}
                strokeWidth={1.5}
                className="ml-1 text-gray-700 transition-all hover:scale-105 active:scale-125 cursor-pointer"
                onClick={showInsight}
              />
            ) : (
              <MessageCircle
                size={16}
                strokeWidth={1.5}
                className="ml-1 text-gray-700 transition-all hover:scale-105 active:scale-125 cursor-pointer"
                onClick={() =>
                  loadComments(entryProp.id, setComments, showComments)
                }
              />
            )}
          </div>

          <CreatorLink username={entryProp.book_tile.user.username} />
        </div>
      </div>
    );

  return (
    <div className="flex flex-col justify-around h-full min-h-24rem">
      <div className="py-5 px-5 md:px-16 font-light whitespace-pre-line flex-grow">
        {commentsView ? (
          <Comments
            comments={comments}
            userId={userId}
            addOverlay={addOverlay}
            removeOverlay={removeOverlay}
          />
        ) : (
          entryProp.content
        )}
      </div>

      <div className="flex justify-between items-center text-sm px-10 md:px-16 py-4 border-b rounded-b-md">
        <div className="flex justify-center items-center gap-x-3">
          <ThumbsUp size={16} color="gray" strokeWidth={1.75} />
          <div className="text-gray-600">{entryProp.net_votes}</div>
          <ThumbsDown size={16} color="gray" strokeWidth={1.75} />
        </div>

        <div className="flex items-center">
          {commentsView ? (
            <X
              size={16}
              color="darkgray"
              className="ml-1 transition-all hover:scale-105 active:scale-125 cursor-pointer"
              onClick={showInsight}
            />
          ) : (
            <MessageCircle
              size={16}
              color="darkgray"
              className="ml-1 transition-all hover:scale-105 active:scale-125 cursor-pointer"
              onClick={() =>
                loadComments(entryProp.id, setComments, showComments)
              }
            />
          )}
        </div>

        <CreatorLink username={entryProp.book_tile.user.username} />
      </div>
    </div>
  );
};

export default EntryGuest;
