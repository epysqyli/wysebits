import Link from "next/link";

const UserAction = ({ href, text, bcgImg }) => {
  return (
    <Link href={href}>
      <div className='cursor-pointer group relative group'>
        <div
          className={`h-28 xl:h-36 ${bcgImg} bg-cover bg-center rounded hover:shadow-lg group transition-all border-b-2 border-slate-400 hover:border-slate-50`}
        >
          <div className='absolute z-10 left-1/2 top-1/2 md:top-1 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 text-center text-xl md:py-1 text-white mb-1 w-4/5 mx-auto md:border-b group-hover:bg-slate-200 group-hover:text-gray-800 group-hover:rounded select-none'>
            {text}
          </div>
          <div className='bg-gray-900 h-full bg-opacity-60 relative group-hover:opacity-50 rounded transition-all'></div>
        </div>
      </div>
    </Link>
  );
};

export default UserAction;
