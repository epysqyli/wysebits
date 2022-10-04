import Link from "next/dist/client/link";
import ICategory from "../../interfaces/ICategory";

interface Props {
  category: ICategory;
}

const CategoryButton = ({ category }: Props) => {
  return (
    <Link
      href={{
        pathname: "/categories/[slug]",
        query: {
          slug: category.slug,
          page: 1
        }
      }}
    >
      <div
        className='text-xl tracking-tight h-16 cursor-pointer transition-all relative group shadow-lg text-gray-50 border-gray-50 border-2 hover:bg-gray-50 hover:text-gray-700 hover:border-blue-300 rounded-md'
      >
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12'>
          <div className='text-center select-none'>{category.name}</div>
        </div>
        <div className='h-full w-full bg-gradient-to-l to-transparent from-white opacity-20'></div>
      </div>
    </Link>
  );
};

export default CategoryButton;
