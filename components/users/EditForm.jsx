import { useState } from "react";

const EditForm = ({
  entryId,
  content,
  handleChange,
  setCurrentId,
  handleSubmit,
  btnVisible,
  showBtn,
}) => {
  const submitBtn = (
    <button
      type="submit"
      className="text-sm border p-1 bg-white absolute w-max bottom-4 right-4 rounded animate-show-up-slow hover:bg-gray-100 active:bg-gray-200 shadow-md"
    >
      Save changes
    </button>
  );

  return (
    <form
      className="w-5/6 mx-auto my-10 pt-2 px-2 bg-gray-200 rounded shadow relative"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="first-entry"
        className="block text-center bg-gray-100 rounded shadow"
      >
        Edit entry
      </label>
      <textarea
        type="text"
        name="first_entry"
        id="first-entry"
        className="border-none bg-white w-full mt-2 rounded focus:ring-0 shadow-sm focus:shadow-md"
        placeholder="Important stuff"
        rows="10"
        onChange={(e) => {
          handleChange(e);
          showBtn(entryId);
        }}
        onClick={() => {
          setCurrentId(entryId);
        }}
        required
      >
        {content}
      </textarea>
      {btnVisible ? submitBtn : null}
    </form>
  );
};

export default EditForm;
