import { useState } from "react";
import { Edit, PlusCircle, XCircle } from "react-feather";
import { postComment } from "../../../lib/commentsMethods";

const CreateComment = ({ entryId, userId, hideForm, updateCommentsState }) => {
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await postComment(content, entryId, userId);
    if (resp.status === 200) {
      updateCommentsState(resp.data);
      hideForm();
    }
  };

  return (
    <div className="z-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full lg:w-5/6 xl:w-3/5 2xl:w-1/2 h-full lg:h-2/3 bg-white pt-20 pb-10 lg:py-5 px-2 lg:rounded lg:shadow overflow-auto lg:border-2 lg:border-gray-700">
      <div className="flex items-center justify-around border-b py-2 text-gray-700 w-4/5 mx-auto hover:bg-gray-50 active:bg-gray-100 cursor-pointer">
        <Edit strokeWidth={1.5} />
        <div className="text-lg">Write your comment</div>
      </div>
      <form onSubmit={handleSubmit} className="pt-2 px-2">
        <label
          htmlFor="content"
          className="flex justify-around text-center py-2 bg-white rounded"
        >
          <div className="italic text-gray-700 select-none"></div>
        </label>
        <textarea
          type="text"
          name="content"
          id="content"
          className="border-none bg-white mt-2 focus:ring-0 w-5/6 mx-auto block"
          placeholder="... ..."
          rows="15"
          minLength="5"
          onChange={handleChange}
          required
        ></textarea>
        <div className="flex items-center justify-around lg:justify-center lg:gap-x-5 w-11/12 mx-auto mt-5">
          <div
            onClick={hideForm}
            className="flex items-center justify-between gap-x-2 border p-2 rounded hover:bg-gray-50 cursor-pointer group"
          >
            <XCircle
              strokeWidth={1.5}
              className="text-gray-700 group-hover:scale-95 group-active:scale-90"
            />
            <div>discard comment</div>
          </div>
          <div className="flex items-center justify-between gap-x-2 border p-2 rounded hover:bg-gray-50 cursor-pointer group">
            <PlusCircle
              strokeWidth={1.5}
              className="text-gray-700 group-hover:scale-95 group-active:scale-90"
            />
            <button type="submit">post comment</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
