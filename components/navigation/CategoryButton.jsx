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
      <div className="text-gray-900 text-xl tracking-tight h-16 rounded-tr rounded-br cursor-pointer bg-white hover:bg-blue-50 active:bg-blue-400 active:shadow-inner active:text-white transition-all relative group border-l-4 border-gray-300 hover:border-gray-400">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12">
          <div className="text-center select-none">{category.name}</div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryButton;
