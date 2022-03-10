import { ArrowDown } from "react-feather";

const Banner = ({text}) => {
  return (
    <div className="flex justify-around items-center border-2 rounded-md py-2 px-5 text-white">
      <span className="block bg-gray text-lg w-4/6">{text}</span>
      <ArrowDown size={40} color="white" />
    </div>
  );
};

export default Banner;
