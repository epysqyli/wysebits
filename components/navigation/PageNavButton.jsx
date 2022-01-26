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
        <div className="py-2 text-center rounded border shadow cursor-pointer hover:bg-gray-200 active:shadow-inner transition-colors group">
          <ArrowLeft
            color="gray"
            className="w-min mx-auto group-hover:pr-2 transition-all"
          />
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
        <div className="py-2 rounded border shadow cursor-pointer hover:bg-gray-200 active:shadow-inner transition-colors group">
          <ArrowRight
            color="gray"
            className="w-min mx-auto group-hover:pl-2 transition-all"
          />
        </div>
      </Link>
    );
};

export default PageNavButton;
