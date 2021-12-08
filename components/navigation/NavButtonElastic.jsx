import Link from "next/dist/client/link";

const PageNavButton = ({ btnText, clientUrl, pageNum }) => {
  if (pageNum == 0) {
    return (
      <div className="py-2 text-center text-gray-300 rounded shadow">
        {btnText}
      </div>
    );
  } else {
    return (
      <Link href={`${clientUrl}/${pageNum}`}>
        <div className="py-2 text-center rounded border shadow cursor-pointer hover:bg-gray-200 active:bg-gray-300 active:text-white transition-colors">
          {btnText}
        </div>
      </Link>
    );
  }
};

export default PageNavButton;
