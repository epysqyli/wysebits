import { AlertCircle } from "react-feather";

const NoItem = ({ itemType }) => {
  return (
    <div>
      <div className="flex justify-center items-center gap-x-5 my-20">
        <AlertCircle
          size={36}
          strokeWidth={1.5}
          className="bg-gray-200 rounded-3xl"
        />
        <div className="text-lg">You have no {itemType} yet!</div>
      </div>
    </div>
  );
};

export default NoItem;
