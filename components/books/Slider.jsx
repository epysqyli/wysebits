import { ChevronLeft, ChevronRight } from "react-feather";
import { useState } from "react";
import EntryPreview from "./EntryPreview";

const Slider = ({ entries }) => {
  const [count, setCount] = useState(0);
  const upperLimit = entries.length - 1;

  const increment = (e) => {
    e.stopPropagation();
    if (count == upperLimit) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };

  const decrement = (e) => {
    e.stopPropagation();
    if (count == 0) {
      setCount(upperLimit);
    } else {
      setCount(count - 1);
    }
  };

  return (
    <div className="flex justify-around items-center mx-auto py-5 bg-gray-100 cursor-default">
      <ChevronLeft
        className="text-gray-500 cursor-pointer hover:text-gray-700 active:scale-105"
        onClick={decrement}
        size={30}
        strokeWidth={1.75}
      />
      <EntryPreview entry={entries[count]} />
      <ChevronRight
        className="text-gray-500 cursor-pointer hover:text-gray-700 active:scale-105"
        onClick={increment}
        size={30}
        strokeWidth={1.75}
      />
    </div>
  );
};

export default Slider;
