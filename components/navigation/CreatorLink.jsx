import Link from "next/dist/client/link";
import { ArrowUpRight } from "react-feather";

const CreatorLink = ({ username }) => {
  return (
    <Link href={`/creators/${username}`}>
      <div className="flex items-center gap-x-1">
        <div className="text-gray-600 active:text-gray-200 cursor-pointer">
          {username}
        </div>
        <ArrowUpRight
          size={18}
          className="text-gray-600 group-hover:scale-110"
        />
      </div>
    </Link>
  );
};

export default CreatorLink;
