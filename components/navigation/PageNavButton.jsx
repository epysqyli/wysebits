import Link from "next/dist/client/link";
import { useEffect } from "react";

const PageNavButton = ({ btnText, url, categorySlug }) => {
  const pageNum = url.split("?page=")[1] || "";

  return (
    <Link href={`/categories/${categorySlug}`}>
      <div className="py-2 text-center rounded border shadow">{btnText}</div>
    </Link>
  );
};

export default PageNavButton;
