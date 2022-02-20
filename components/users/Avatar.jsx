import Image from "next/dist/client/image";
import { User } from "react-feather";

const Avatar = ({ avatarUrl, size }) => {
  if (avatarUrl !== null)
    return (
      <Image
        src={avatarUrl}
        className="animate-show-up-slow rounded-full"
        layout="fixed"
        width={size}
        height={size}
        objectFit="cover"
      />
    );

  return (
    <User
      size={size}
      strokeWidth={1.5}
      color="gray"
      className="bg-gray-300 rounded-full p-2"
    />
  );
};

export default Avatar;
