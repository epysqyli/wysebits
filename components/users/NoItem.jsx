import { AlertCircle } from "react-feather";

const NoItem = ({ message }) => {
  return (
    <>
      <div className="flex justify-center gap-x-2 items-center mx-auto">
        <AlertCircle
          size={36}
          strokeWidth={1.5}
          className="rounded-3xl w-1/4 text-gray-100"
          fill="lightgray"
        />
        <div className="w-3/4 md:text-lg text-gray-100 text-center">{message}</div>
      </div>
    </>
  );
};

export default NoItem;
