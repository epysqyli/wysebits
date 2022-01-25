import { ArrowRightCircle } from "react-feather";
import Link from "next/dist/client/link";

const CategoryButton = ({ category }) => {
  return (
    <Link href={`/categories/${category.slug}/1`}>
      <div className="text-gray-800 text-lg tracking-tight px-4 pt-2 pb-6 rounded cursor-pointer border-blue-200 border-2 bg-gray-100 hover:bg-blue-100 hover:border-blue-400 hover:shadow-none active:bg-blue-200 active:shadow-inner transition-all relative group">
        <div>{category.name}</div>
        <ArrowRightCircle
          size={18}
          color="black"
          strokeWidth={1.75}
          className="absolute bottom-2 right-5 opacity-0 group-hover:opacity-75 group-hover:right-2 transition-all"
        />
      </div>
    </Link>
  );
};

export default CategoryButton;
