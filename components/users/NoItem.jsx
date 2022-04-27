import { AlertCircle } from "react-feather";

const NoItem = ({ message }) => {
  return (
    <>
      <div className="flex items-center">
        <AlertCircle
          size={40}
          strokeWidth={1.5}
          className="rounded-3xl w-1/3 text-gray-100"
          fill="transparent"
        />
        <div className="w-2/3 md:text-lg text-gray-100">{message}</div>
      </div>
    </>
  );
};

export default NoItem;
