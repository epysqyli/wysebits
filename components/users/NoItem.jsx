import { AlertCircle } from "react-feather";

const NoItem = ({ message }) => {
  return (
    <>
      <div className="flex items-center justify-between lg:justify-around xl:justify-center mx-auto px-2 py-1">
        <AlertCircle
          size={42}
          strokeWidth={1.5}
          className="rounded-3xl text-gray-100"
          fill="transparent"
        />
        <div className="w-2/3 md:text-lg text-gray-100 text-right">{message}</div>
      </div>
    </>
  );
};

export default NoItem;
