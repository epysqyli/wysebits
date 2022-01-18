import { ChevronRight } from "react-feather";
import Link from "next/dist/client/link";

const ManageBox = ({ text, href }) => {
  return (
    <Link href={href}>
      <div className="flex items-center justify-center gap-x-10 md:gap-x-20 bg-white shadow py-2 rounded group cursor-pointer">
        <ChevronRight className="group-hover:scale-110 group-active:scale-100 transition-transform" />
        <div className="text-gray-800">{text}</div>
      </div>
    </Link>
  );
};

export default ManageBox;
