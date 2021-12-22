import dayjs from "dayjs";

const EditForm = ({
  entryId,
  content,
  updateTime,
  handleChange,
  setCurrentId,
  handleSubmit,
  btnVisible,
  showBtn,
}) => {
  const submitBtn = (
    <button
      type="submit"
      className="text-sm border p-1 bg-white absolute w-max bottom-4 right-4 rounded animate-show-up-slow-opaque hover:bg-gray-100 active:bg-gray-200 shadow-md opacity-50 hover:opacity-100 transition-all"
    >
      Save changes
    </button>
  );

  return (
    <form
      className="w-4/5 mx-auto md:w-4/6 lg:w-3/6 my-10 pt-2 px-2 bg-gray-200 rounded-md shadow relative"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="first-entry"
        className="flex justify-between px-3 py-2 text-center bg-gray-100 rounded shadow text-gray-600 text-sm mb-2"
      >
        <div>Last updated at:</div>
        <div>{dayjs(updateTime).format("MM-DD-YYYY HH:mm ")}</div>
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
