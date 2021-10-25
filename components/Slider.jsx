import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import { useState } from "react";
import HomeTileEntry from "./HomeTileEntry";

const Slider = ({ entries }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="flex justify-around items-center border rounded-md shadow-md w-5/6 mx-auto py-5">
      <ArrowLeftCircle onClick={decrement} size={36} />
      <HomeTileEntry entry={entries[count]} />
      <ArrowRightCircle onClick={increment} size={36} />
    </div>
  );
};

export default Slider;
