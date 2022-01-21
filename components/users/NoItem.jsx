import { AlertCircle } from "react-feather";

const NoItem = ({ message }) => {
  return (
    <div className="text-center">
      <div className="flex justify-center items-center gap-x-5">
        <AlertCircle
          size={36}
          strokeWidth={1.5}
          className="rounded-3xl w-1/6"
          fill="lightgray"
        />
        <div className="text w-4/6 md:text-lg">{message}</div>
      </div>
    </div>
  );
};

export default NoItem;
