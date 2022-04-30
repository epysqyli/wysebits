import { AlertCircle } from "react-feather";

const NoItem = ({ message }) => {
  return (
    <>
      <div className="flex items-center mx-auto w-5/6">
        <AlertCircle
          size={48}
          strokeWidth={1.5}
          className="rounded-3xl w-1/4 text-gray-100"
          fill="transparent"
        />
        <div className="w-3/4 md:text-lg text-gray-100 text-right">{message}</div>
      </div>
    </>
  );
};

export default NoItem;
