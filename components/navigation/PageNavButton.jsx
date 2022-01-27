import { ArrowLeft, ArrowRight } from "react-feather";
import Link from "next/dist/client/link";

const PageNavButton = ({ direction, url, clientUrl }) => {
  const pageNum = url.split("?page=")[1] || "";

  if (pageNum == "" && direction == "left")
    return (
      <div className="py-2 text-center text-gray-300 rounded shadow">
        <ArrowLeft className="w-min mx-auto" />
      </div>
    );

  if (direction == "left")
    return (
      <Link href={`${clientUrl}/${pageNum}`}>
        <div className="py-2 text-center rounded shadow-md cursor-pointer border-2 border-transparent bg-gray-50 hover:bg-blue-50 hover:shadow-none hover:border-2 hover:border-gray-400 active:shadow-inner transition-colors group">
          <ArrowLeft className="w-min mx-auto group-hover:pr-2 text-gray-400 group-hover:text-gray-600 transition-all" />
        </div>
      </Link>
    );

  if (pageNum == "" && direction == "right")
    return (
      <div className="py-2 text-center text-gray-300 rounded shadow">
        <ArrowRight className="w-min mx-auto" />
      </div>
    );

  if (direction == "right")
    return (
      <Link href={`${clientUrl}/${pageNum}`}>
        <div className="py-2 text-center rounded shadow-md cursor-pointer border-2 border-transparent bg-gray-50 hover:bg-blue-50 hover:shadow-none hover:border-2 hover:border-gray-400 active:shadow-inner transition-colors group">
          <ArrowRight className="w-min mx-auto group-hover:pl-2 text-gray-400 group-hover:text-gray-600 transition-all" />
        </div>
      </Link>
    );
};

export default PageNavButton;
