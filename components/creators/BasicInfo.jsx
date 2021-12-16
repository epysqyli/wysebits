import { User } from "react-feather";

const BasicInfo = () => {
  return (
    <div className="flex justify-around items-center py-5">
      <User
        size={72}
        strokeWidth={1.5}
        color="gray"
        className="bg-gray-300 rounded-full p-2"
      />
      <div>
        <div>Username</div>
        <div>contributions to x books</div>
        <div>y total insights created</div>
      </div>
    </div>
  );
};

export default BasicInfo;
