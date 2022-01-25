import { ArrowRightCircle } from "react-feather";
import Link from "next/dist/client/link";

const CategoryButton = ({ category }) => {
  return (
    <Link href={`/categories/${category.slug}/1`}>
      <div className="text-gray-900 break-words text-lg tracking-tight px-4 pt-2 pb-6 rounded cursor-pointer border-blue-300 border-2 bg-gray-100 hover:pl-5 hover:bg-blue-100 hover:border-blue-400 active:bg-blue-300 active:shadow-inner active:text-white shadow-md transition-all relative group">
        <div>{category.name}</div>
        <ArrowRightCircle
          size={18}
          strokeWidth={2}
          className="absolute bottom-2 right-5 group-active:text-white opacity-0 group-hover:opacity-75 group-hover:right-2 transition-all"
        />
      </div>
    </Link>
  );
};

export default CategoryButton;
