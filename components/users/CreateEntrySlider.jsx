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
    <div className="flex justify-between items-center gap-x-2 md:gap-x-3">
      <div
        onClick={decrement}
        className="py-40 shadow hover:shadow-md cursor-pointer rounded-md active:shadow-inner"
      >
        <ChevronLeft size={36} strokeWidth={1.5} />
      </div>
      <div className="flex-grow">
        <CreateEntryForm
          entry={entries[current]}
          isEntryValid={isEntryValid}
          handleChange={handleChange}
          saveForLater={saveForLater}
        />
      </div>
      <div
        onClick={increment}
        className="py-40 shadow hover:shadow-md cursor-pointer rounded-md active:shadow-inner"
      >
        <ChevronRight size={36} strokeWidth={1.5} />
      </div>
    </div>
  );
};

export default CreateEntrySlider;
