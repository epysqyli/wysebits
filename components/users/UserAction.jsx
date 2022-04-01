import Link from "next/link";

const UserAction = ({ href, text, bcgImg }) => {
  return (
    <Link href={href}>
      <div className="cursor-pointer group relative group">
        <div
          className={`h-14 md:h-28 xl:h-36 ${bcgImg} bg-cover bg-center rounded shadow-lg hover:shadow-lg group transition-all`}
        >
          <div className="absolute z-10 left-1/2 top-1/2 md:top-1 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 text-center text-xl md:py-1 text-white mb-1 w-4/5 mx-auto md:border-b group-hover:bg-gray-50 group-hover:text-gray-800 group-hover:rounded">
            {text}
          </div>
          <div className="bg-gray-900 h-full bg-opacity-60 relative group-hover:opacity-25 rounded transition-all"></div>
        </div>
      </div>
    </Link>
  );
};

export default UserAction;
