import { useState, useRef, useEffect, useContext } from "react";
import { Edit, UserPlus } from "react-feather";
import CreatorLink from "../../navigation/CreatorLink";
import CreateComment from "./CreateComment";
import { OverlayContext } from "../../../hooks/OverlayContext";
import Link from "next/dist/client/link";

const Comments = ({ comments, setComments, entryId, userId }) => {
  const commentRef = useRef();
  const [showCreate, setShowCreate] = useState(false);
  const { showOverlay, hideOverlay, secondaryLayer } = useContext(OverlayContext);

  const showForm = () => {
    setShowCreate(true);
    showOverlay();
  };

  const hideForm = () => {
    setShowCreate(false);
    if (secondaryLayer === false) hideOverlay();
  };

  const updateCommentsState = (newComment) => {
    setComments([...comments, newComment].reverse());
  };

  useEffect(() => {
    commentRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  if (userId)
    return (
      <div ref={commentRef} className='text-sm font-normal max-h-24rem overflow-y-auto px-4'>
        <div
          onClick={showForm}
          className='flex items-center justify-around border-b py-2 text-gray-700 w-full mx-auto hover:bg-gray-50 active:bg-gray-100 cursor-pointer'
        >
          <Edit strokeWidth={1.5} />
          <div>Write your comment</div>
        </div>
        {comments.map((comment) => {
          return (
            <div key={comment.id} className='my-5 pb-5 border-b'>
              <div className='break-words'>{comment.content}</div>
              <div className='mt-3'>
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

  return (
    <div className='text-sm font-normal max-h-24rem overflow-y-auto px-4'>
      <div ref={commentRef} className='text-sm font-normal max-h-24rem overflow-y-auto px-4'></div>
      <Link href='/registrations/signup'>
        <div className='flex items-center justify-center mx-auto w-5/6 gap-x-5 text-gray-700'>
          <UserPlus size={20} />
          <div className='cursor-pointer underline hover:scale-95 transition-transform'>
            Sign up to leave a comment
          </div>
        </div>
      </Link>
      {comments.map((comment) => {
        return (
          <div key={comment.id} className='my-5 pb-5 border-b'>
            <div className='break-words'>{comment.content}</div>
            <div className='mt-3'>
              <CreatorLink username={comment.user.username} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
