import dayjs from "dayjs";
import { Save } from "react-feather";

const EditForm = ({ entry, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={(e) => handleSubmit(e, entry)}>
      <label
        htmlFor="entry"
        className="flex justify-between px-3 py-2 text-center bg-gray-100 rounded shadow text-gray-600 text-sm mb-2"
      >
        <div className="flex gap-x-2">
          <div>Last updated at:</div>
          <div>{dayjs(entry.updateTime).format("MM-DD-YYYY HH:mm ")}</div>
        </div>
        <button type="submit">
          <Save />
        </button>
      </label>
      <textarea
        type="text"
        name={entry.name}
        id="entry"
        className="border-none bg-white w-full rounded focus:ring-0 shadow-sm focus:shadow-md"
        placeholder="Important stuff"
        rows="10"
        value={entry.content || ""}
        onChange={handleChange}
        required
      ></textarea>
    </form>
  );
};

export default EditForm;
