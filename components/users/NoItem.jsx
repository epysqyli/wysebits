import { AlertCircle } from "react-feather";

const NoItem = ({ message }) => {
  return (
    <div>
      <div className="flex justify-center items-center gap-x-5 my-20">
        <AlertCircle
          size={36}
          strokeWidth={1.5}
          className="rounded-3xl w-1/6"
        />
        <div className="text-lg w-5/6">{message}</div>
      </div>
    </div>
  );
};

export default NoItem;
