import { useState } from "react";
import EditForm from "./EditForm";
import { ChevronLeft, ChevronRight } from "react-feather";

const EditEntrySlider = ({ entries, handleChange, handleSubmit }) => {
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
    <div>
      <div className="flex justify-around gap-x-5 mb-5">
        <div
          onClick={decrement}
          className="bg-white text-gray-500 shadow hover:shadow-md hover:text-black cursor-pointer rounded active:shadow-inner group flex-grow"
        >
          <ChevronLeft
            size={36}
            strokeWidth={1.5}
            className="group-active:scale-90 mx-auto"
          />
        </div>
        <div
          onClick={increment}
          className="bg-white text-gray-500 shadow hover:shadow-md hover:text-black cursor-pointer rounded active:shadow-inner group flex-grow"
        >
          <ChevronRight
            size={36}
            strokeWidth={1.5}
            className="group-active:scale-90 mx-auto"
          />
        </div>
      </div>

      <div className="flex-grow rounded-md shadow-md">
        <EditForm
          entry={entries[current]}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditEntrySlider;
