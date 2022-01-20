import { ChevronRight } from "react-feather";
import Link from "next/dist/client/link";

const ManageBox = ({ text, href }) => {
  return (
    <Link href={href}>
      <div className="hover:shadow-md transition-shadow">
        <div className="flex items-center justify-center gap-x-10 md:gap-x-20 bg-white active:bg-gray-100 shadow py-2 rounded group cursor-pointer">
          <ChevronRight className="group-hover:scale-110 group-hover:ml-3 group-active:scale-100 transition-all" />
          <div className="text-gray-800">{text}</div>
        </div>
      </div>
    </Link>
  );
};

export default ManageBox;
