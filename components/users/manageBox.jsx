import { ChevronRight } from "react-feather";
import Link from "next/dist/client/link";

const ManageBox = ({ text, href }) => {
  return (
    <Link href={href}>
      <div className='shadow hover:shadow-md transition-shadow rounded-md'>
        <div className='flex items-center justify-between bg-white active:bg-gray-100 shadow py-3 px-5 md:px-10 rounded-md group cursor-pointer'>
          <ChevronRight className='group-hover:scale-110 group-hover:ml-3 group-active:scale-100 transition-all' />
          <div className='text-gray-800'>{text}</div>
        </div>
      </div>
    </Link>
  );
};

export default ManageBox;
