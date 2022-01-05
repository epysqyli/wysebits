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
  const increment = () => setCurrent(current++);
  const decrement = () => setCurrent(current--);

  return (
    <div className="flex justify-around items-center">
      <ChevronLeft  />
      <CreateEntryForm
        entry={entries[current]}
        isEntryValid={isEntryValid}
        handleChange={handleChange}
        saveForLater={saveForLater}
      />
      <ChevronRight />
    </div>
  );
};

export default CreateEntrySlider;
