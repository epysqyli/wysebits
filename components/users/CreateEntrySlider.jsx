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
    return value;
  };

  return (
    <div className="flex justify-between items-center gap-x-3">
      <div onClick={decrement}>
        <ChevronLeft />
      </div>
      <div className="flex-grow">
        <CreateEntryForm
          entry={entries[current]}
          isEntryValid={isEntryValid}
          handleChange={handleChange}
          saveForLater={saveForLater}
        />
      </div>
      <div onClick={increment}>
        <ChevronRight />
      </div>
    </div>
  );
};

export default CreateEntrySlider;
