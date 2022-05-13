import Link from "next/dist/client/link";

const CategoryButton = ({ category }) => {
  return (
    <Link
      href={{
        pathname: "/categories/[category]",
        query: {
          category: category.slug,
          page: 1,
        },
      }}
    >
      <div className="text-xl tracking-tight h-16 cursor-pointer transition-all relative group shadow-lg text-gray-50 border-gray-50 border-2 hover:bg-gray-50 hover:text-gray-700 hover:border-blue-300 rounded-md">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12">
          <div className="text-center select-none">{category.name}</div>
        </div>
        <div className="bg-gradient-to-r from-green-200 to-yellow-200 h-full w-full opacity-10"></div>
      </div>
    </Link>
  );
};

export default CategoryButton;
