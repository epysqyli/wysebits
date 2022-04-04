import { AlertCircle } from "react-feather";

const NoItem = ({ message }) => {
  return (
    <>
      <div className="flex justify-center gap-x-5 items-center mx-auto">
        <AlertCircle
          size={36}
          strokeWidth={1.5}
          className="rounded-3xl w-1/6"
          fill="lightgray"
        />
        <div className="text w-4/6 md:text-lg text-gray-100">{message}</div>
      </div>
    </>
  );
};

export default NoItem;
