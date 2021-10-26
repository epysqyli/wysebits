import { LogIn, User } from "react-feather";
import Link from "next/link";

const Header = ({ userState }) => {
  const login = (
    <Link href="/registrations/login">
      <a className="flex items-center group cursor-pointer">
        <LogIn size={20} className="group-hover:scale-110 transition-all" />
        <div className="mx-3 group-active:text-white transition-all">Login</div>
      </a>
    </Link>
  );

  const loggedUser = (
    <Link href="/user/homepage">
      <a className="flex items-center group cursor-pointer">
        <User size={20} className="group-hover:scale-110 transition-all" />
        <div className="mx-3 group-active:text-white transition-all">
          {userState.user.username}
        </div>
      </a>
    </Link>
  );

  return (
    <header className="flex justify-between items-center bg-gray-300 py-2 px-5 text-center w-screen fixed z-10 shadow-sm">
      <Link href="/">
        <a>
          <div className="text-2xl font-bold cursor-pointer hover:scale-105 transition-all active:text-white">
            Wbits.
          </div>
        </a>
      </Link>
      {userState.isLogged ? loggedUser : login}
    </header>
  );
};

export default Header;
