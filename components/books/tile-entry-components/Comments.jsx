import { useState } from "react";
import { Edit } from "react-feather";
import CreatorLink from "../../navigation/CreatorLink";
import CreateComment from "./CreateComment";

const Comments = ({ comments, setComments, entryId, userId }) => {
  const [showCreate, setShowCreate] = useState(false);
  const showForm = () => setShowCreate(true);
  const hideForm = () => setShowCreate(false);

  const updateCommentsState = (newComment) => {
    setComments([...comments, newComment].reverse());
  };

  return (
    <div className="text-sm font-normal max-h-24rem overflow-y-auto px-4">
      <div
        onClick={showForm}
        className="flex items-center justify-around border-b py-2 text-gray-700 w-4/5 mx-auto hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
      >
        <Edit strokeWidth={1.5} />
        <div>Write your comment</div>
      </div>
      {comments.map((comment) => {
        return (
          <div key={comment.id} className="my-5 pb-5 border-b">
            <div className="break-all">{comment.content}</div>
            <div className="mt-3">
              <CreatorLink username={comment.user.username} />
            </div>
          </div>
        );
      })}
      {showCreate ? (
        <CreateComment
          entryId={entryId}
          userId={userId}
          hideForm={hideForm}
          updateCommentsState={updateCommentsState}
        />
      ) : null}
    </div>
  );
};

export default Comments;
