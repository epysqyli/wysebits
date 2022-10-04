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
      <div className='text-xl tracking-tight h-16 cursor-pointer relative text-white border-b-2 border-slate-200 hover:border-slate-50 rounded hover:shadow-md group'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12'>
          <div className='text-center select-none'>{category.name}</div>
        </div>
        <div className='h-full w-full rounded bg-gradient-to-b from-slate-600 to-slate-600 group-hover:to-slate-700  group-active:to-slate-800'></div>
      </div>
    </Link>
  );
};

export default CategoryButton;
