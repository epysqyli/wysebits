import { AlertCircle } from "react-feather";

const NoItem = ({ itemType }) => {
  return (
    <div>
      <div className="flex justify-around items-center w-4/5 mx-auto my-20">
        <AlertCircle size={36} strokeWidth={1.5} />
        <div className="text-lg">You have not saved any {itemType} yet!</div>
      </div>
    </div>
  );
};

export default NoItem;
