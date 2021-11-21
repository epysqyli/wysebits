import Link from "next/dist/client/link";

const CategoryButton = ({ category }) => {
  return (
    <Link href={`/categories/${category.slug}`}>
      <div className="text-center p-2 rounded-md shadow-md cursor-pointer bg-white hover:bg-gray-100 hover:shadow-md active:bg-gray-200 transition-all">
        {category.name}
      </div>
    </Link>
  );
};

export default CategoryButton;
