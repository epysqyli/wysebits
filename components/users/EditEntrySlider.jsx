import { useState } from "react";
import EditForm from "./EditForm";
import { ChevronLeft, ChevronRight } from "react-feather";

const EditEntrySlider = ({
  entries,
  handleChange,
  handleSubmit,
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
        className="py-40 ml-2 bg-white text-gray-500 border hover:shadow hover:text-black cursor-pointer rounded active:shadow-inner group"
      >
        <ChevronLeft
          size={36}
          strokeWidth={1.5}
          className="group-active:scale-90"
        />
      </div>
      <div className="flex-grow rounded-md shadow-md">
        <EditForm entry={entries[current]} handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
      <div
        onClick={increment}
        className="py-40 mr-2 bg-white text-gray-500 border hover:shadow hover:text-black cursor-pointer rounded active:shadow-inner group"
      >
        <ChevronRight
          size={36}
          strokeWidth={1.5}
          className="group-active:scale-90"
        />
      </div>
    </div>
  );
};

export default EditEntrySlider;