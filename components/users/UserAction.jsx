import Link from "next/link";

const UserAction = ({ href, text, bcgImg }) => {
  return (
    <Link href={href}>
      <div className="border-2 rounded cursor-pointer group">
        <div className="text-center text-lg tracking-tight py-1 bg-gray-300">{text}</div>
        <div
          className={`h-28 xl:h-36 ${bcgImg} bg-cover bg-center rounded shadow-lg hover:shadow-lg group transition-all`}
        >
          <div className="bg-gray-900 h-full bg-opacity-50 relative group-hover:opacity-25 transition-colors"></div>
        </div>
      </div>
    </Link>
  );
};

export default UserAction;
