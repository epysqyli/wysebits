import { Save } from "react-feather";

const CreateEntryForm = ({
  entry,
  handleChange,
  saveForLater,
  isEntryValid,
}) => {
  return (
    <div className="pt-2 px-2">
      <label
        htmlFor={entry.name}
        className="flex justify-around text-center py-2 bg-white rounded"
      >
        <div className="italic text-gray-700 select-none">
          Enter your {entry.name.split("_")[0]} takeaway
        </div>
        {isEntryValid(entry.content) ? (
          <Save
            className="cursor-pointer hover:scale-110 active:scale-100 text-gray-600"
            onClick={() => saveForLater(entry)}
          />
        ) : (
          <Save className="text-gray-200" />
        )}
      </label>
      <textarea
        type="text"
        name={entry.name}
        id={entry.name}
        className="border-none bg-white w-full mt-2 focus:ring-0 focus:shadow-md rounded"
        placeholder="Important stuff"
        rows="20"
        onChange={handleChange}
        value={entry.content || ""}
        required
      ></textarea>
    </div>
  );
};

export default CreateEntryForm;
