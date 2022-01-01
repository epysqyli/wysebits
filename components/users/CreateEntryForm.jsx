import { Save } from "react-feather";

const CreateEntryForm = ({ entry, handleChange, saveForLater, isEntryValid }) => {
  return (
    <div className="my-10 pt-2 px-2 bg-gray-200 shadow-lg rounded">
      <label
        htmlFor={entry.name}
        className="flex justify-around text-center py-2 bg-white shadow-sm rounded"
      >
        <div>Enter your first takeaway</div>
        {isEntryValid(entry) ? (
          <Save
            className="cursor-pointer hover:scale-110 active:scale-100"
            onClick={() => saveForLater(entry)}
          />
        ) : (
          <Save className="text-gray-200" />
        )}
      </label>
      <textarea
        type="text"
        name={entry.name}
        id={entry.id}
        className="border-none bg-white w-full mt-2 focus:ring-0 shadow-sm focus:shadow-md rounded"
        placeholder="Important stuff"
        rows="10"
        onChange={handleChange}
        value={entry.content || null}
        required
      ></textarea>
    </div>
  );
};

export default CreateEntryForm;
