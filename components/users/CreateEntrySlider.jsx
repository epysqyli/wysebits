import { useState } from "react";
import CreateEntryForm from "./CreateEntryForm";
import { ChevronLeft, ChevronRight } from "react-feather";

const CreateEntrySlider = ({
  entries,
  isEntryValid,
  handleChange,
  saveForLater,
}) => {
  const [current, setCurrent] = useState(0);
  const increment = () => setCurrent(handleIncrement(current));
  const decrement = () => setCurrent(handleDecrement(current));

  const handleIncrement = (value) => {
    if (value < entries.length - 1) return value + 1;
    return 0;
  };

  const handleDecrement = (value) => {
    if (value === 0) return entries.length - 1;
    return value - 1;
  };

  return (
    <div className="flex justify-around items-center gap-x-2 md:gap-x-5">
      <div
        onClick={decrement}
        className="py-40 ml-2 bg-white text-gray-500 border hover:shadow hover:text-black cursor-pointer rounded-md active:shadow-inner group"
      >
        <ChevronLeft size={36} strokeWidth={1.5} className="group-active:scale-90" />
      </div>
      <div className="flex-grow bg-gray-200 rounded-md shadow-md">
        <CreateEntryForm
          entry={entries[current]}
          isEntryValid={isEntryValid}
          handleChange={handleChange}
          saveForLater={saveForLater}
        />
      </div>
      <div
        onClick={increment}
        className="py-40 mr-2 bg-white text-gray-500 border hover:shadow hover:text-black cursor-pointer rounded-md active:shadow-inner group"
      >
        <ChevronRight size={36} strokeWidth={1.5} className="group-active:scale-90" />
      </div>
    </div>
  );
};

export default CreateEntrySlider;
