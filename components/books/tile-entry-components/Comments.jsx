import CreatorLink from "../../navigation/CreatorLink";

const Comments = ({ comments }) => {
  return (
    <div className="text-sm font-normal max-h-24rem overflow-y-auto px-4">
      {comments.map((comment) => {
        return (
          <div key={comment.id} className="my-5 pb-5 border-b">
            <div>{comment.content}</div>
            <div className="mt-3">
              <CreatorLink username={comment.user.username} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
