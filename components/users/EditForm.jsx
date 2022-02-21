import dayjs from "dayjs";
import { Save } from "react-feather";
import { isEntryValid } from "../../lib/utils";

const EditForm = ({ entry, handleChange, handleSubmit }) => {

  return (
    <form onSubmit={(e) => handleSubmit(e, entry)} className="pt-2 px-2">
      <label
        htmlFor="entry"
        className="flex justify-between px-3 py-2 text-center bg-gray-100 rounded shadow text-gray-600 text-sm mb-2"
      >
        <div className="flex gap-x-2">
          <div>Last updated at:</div>
          <div>{dayjs(entry.updateTime).toString()}</div>
        </div>
        {isEntryValid(entry.content) ? (
          <button type="submit" className="hover:scale-110 active:scale-100">
            <Save />
          </button>
        ) : (
          <Save className="text-gray-300" />
        )}
      </label>

      <textarea
        type="text"
        name={entry.name}
        id="entry"
        className="border-none bg-white w-full rounded focus:ring-0 shadow-sm focus:shadow-md"
        placeholder="Important stuff"
        rows="20"
        value={entry.content || ""}
        onChange={handleChange}
        required
      ></textarea>
    </form>
  );
};

export default EditForm;
