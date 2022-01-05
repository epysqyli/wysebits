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
      <div className="flex justify-around items-center gap-x-5 mb-5">
        <div
          onClick={decrement}
          className="bg-white text-gray-500 shadow hover:shadow-md hover:text-black cursor-pointer rounded active:shadow-inner group flex-grow py-1"
        >
          <ChevronLeft
            size={30}
            strokeWidth={1.5}
            className="group-active:scale-90 mx-auto"
          />
        </div>
        <div className="p-2 text-sm rounded-full text-gray-700 bg-white shadow-md">{`${
          current + 1
        } / ${entries.length}`}</div>
        <div
          onClick={increment}
          className="bg-white text-gray-500 shadow hover:shadow-md hover:text-black cursor-pointer rounded active:shadow-inner group flex-grow py-1"
        >
          <ChevronRight
            size={30}
            strokeWidth={1.5}
            className="group-active:scale-90 mx-auto"
          />
        </div>
      </div>

      <div className="flex-grow bg-gray-200 rounded-md shadow-md">
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
