import Link from "next/dist/client/link";

const CategoryButton = ({ category }) => {
  return (
    <Link href={`/categories/${category.slug}/1`}>
      <div className="text-gray-800 text-center px-4 py-4 rounded-md shadow cursor-pointer bg-white hover:bg-gray-100 hover:shadow-md active:bg-gray-200 border-transparent border-2 hover:border-yellow-500 active:shadow-inner transition-all">
        {category.name}
      </div>
    </Link>
  );
};

export default CategoryButton;
