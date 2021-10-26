import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import { useState } from "react";
import HomeTileEntry from "./HomeTileEntry";

const Slider = ({ entries }) => {
  const [count, setCount] = useState(0);
  const upperLimit = entries.length - 1;

  const increment = () => {
    if (count == upperLimit) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count == 0) {
      setCount(upperLimit);
    } else {
      setCount(count - 1);
    }
  };

  return (
    <div className="flex justify-around items-center border rounded-md shadow-md hover:shadow-lg w-5/6 mx-auto py-5 bg-gray-100">
      <ArrowLeftCircle
        className="text-gray-500 cursor-pointer hover:text-gray-700 active:scale-105"
        onClick={decrement}
        size={30}
      />
      <HomeTileEntry entry={entries[count]} />
      <ArrowRightCircle
        className="text-gray-500 cursor-pointer hover:text-gray-700 active:scale-105"
        onClick={increment}
        size={30}
      />
    </div>
  );
};

export default Slider;
