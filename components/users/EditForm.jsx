const EditForm = ({ entryId, content, handleChange, setCurrentId, handleSubmit }) => {
  return (
    <form
      className="w-5/6 mx-auto my-10 pt-2 pb-5 px-2 bg-gray-200 rounded shadow"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="first-entry"
        className="block text-center bg-gray-100 rounded shadow"
      >
        Edit takeaway
      </label>
      <textarea
        type="text"
        name="first_entry"
        id="first-entry"
        className="border-none bg-white w-full mt-2 rounded focus:ring-0 shadow-sm focus:shadow-md"
        placeholder="Important stuff"
        rows="10"
        onChange={handleChange}
        onClick={() => setCurrentId(entryId)}
        required
      >{content}</textarea>
      <button
        type="submit"
        className="w-3/5 mx-auto block border mt-10 mb-5 py-2 bg-white"
      >
        Edit this entry
      </button>
    </form>
  );
};

export default EditForm;
