import Link from "next/dist/client/link";

const CategoryButton = ({ category }) => {
  return (
    <Link href={`/categories/${category.slug}/1`}>
      <div className="text-gray-800 text-center p-2 rounded-md shadow cursor-pointer bg-white hover:bg-gray-100 hover:shadow-md active:bg-gray-200 active:shadow-inner transition-all">
        {category.name}
      </div>
    </Link>
  );
};

export default CategoryButton;
