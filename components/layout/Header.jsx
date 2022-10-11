import { LogIn, User, LogOut, Plus, UserPlus } from "react-feather";
import Link from "next/link";
import Image from "next/dist/client/image";
import { useRouter } from "next/router";
import axios from "axios";

const Header = ({ userState, userLoading }) => {
  const router = useRouter();

  const logoutCall = () => {
    axios
      .get(`${process.env.BASE_URL}/logout`, { withCredentials: true })
      .then((res) => {
        if (res.data.status === "success") window.location = "/";
      })
      .catch((err) => console.log(err));
  };

  const guest = (
    <div className='flex gap-x-5 text-sm py-1 px-2 rounded-md text-slate-50'>
      <Link href='/registrations/login'>
        <a className='flex items-center cursor-pointer'>
          <LogIn size={20} strokeWidth={2} className='hover:scale-110 transition-all' />
        </a>
      </Link>
      <Link href='/registrations/signup'>
        <a className='flex items-center cursor-pointer'>
          <UserPlus size={20} strokeWidth={2} className='hover:scale-110 transition-all' />
        </a>
      </Link>
    </div>
  );

  const loggedUser = (
    <div className='flex justify-around items-center rounded-md px-2 text-slate-50'>
      <Link href='/users/actions'>
        <a className='flex items-center mr-3 group cursor-pointer'>
          {userLoading === false && userState.user.avatar !== null ? (
            <Image
              className='rounded-full'
              src={userState.user.avatar}
              width='20'
              height='20'
              objectFit='cover'
            />
          ) : (
            <User size={18} strokeWidth={1.75} className='group-hover:scale-110' />
          )}

          <div className='mx-3 group-active:text-white transition-all'>{userState.user.username}</div>
        </a>
      </Link>
      <Link href='/users/book-search/'>
        <a className='group cursor-pointer mr-5'>
          <Plus size={20} className='hover:scale-110 hover:text-gray-300 active:text-white cursor-pointer' />
        </a>
      </Link>
      <LogOut size={20} className='hover:scale-110 hover:text-gray-300 cursor-pointer' onClick={logoutCall} />
    </div>
  );

  return (
    <header className='flex justify-between items-center backdrop-blur backdrop-brightness-50 border-b-2 border-slate-300 px-2 md:px-5 py-1 text-center w-screen fixed shadow-sm z-50'>
      <Link href='/'>
        <div className='text-2xl scale-95 bg-white rounded px-3 font-bold cursor-pointer hover:scale-105 transition-all active:text-white active:bg-gray-800'>
          Wbits.
        </div>
      </Link>
      {userState.isLogged ? loggedUser : guest}
    </header>
  );
};

export default Header;
