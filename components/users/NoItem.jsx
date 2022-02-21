import { AlertCircle } from "react-feather";

const NoItem = ({ message }) => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <AlertCircle
          size={36}
          strokeWidth={1.5}
          className="rounded-3xl w-1/6"
          fill="lightgray"
        />
        <div className="text w-4/6 md:text-lg text-center">{message}</div>
      </div>
    </div>
  );
};

export default NoItem;
