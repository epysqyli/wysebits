import Link from "next/link";

const UserAction = ({ href, text, bcgImg }) => {
  return (
    <Link href={href}>
      <div
        className={`h-28 xl:h-36 ${bcgImg} bg-cover bg-center rounded-md shadow-lg cursor-pointer hover:shadow-lg group transition-all`}
      >
        <div className="bg-gray-800 h-full bg-opacity-75 relative rounded group-hover:bg-opacity-80 transition active:bg-gray-900">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="text-white text-2xl text-center transition-all">
              {text}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserAction;
