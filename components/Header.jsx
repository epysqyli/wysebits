import { LogIn, User, LogOut } from "react-feather";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = ({ userState }) => {
  const router = useRouter();

  const logoutCall = async () => {
    let resp = await fetch("http://localhost:3001/api/logout", {
      credentials: "include",
    });
    resp = await resp.json();

    if (resp.status === "success") {
      router.reload();
    }
  };

  const login = (
    <Link href="/registrations/login">
      <a className="flex items-center group cursor-pointer">
        <LogIn size={20} className="group-hover:scale-110 transition-all" />
        <div className="mx-3 group-active:text-white transition-all">Login</div>
      </a>
    </Link>
  );

  const loggedUser = (
    <div className="flex justify-around items-center">
      <Link href="/users/actions">
        <a className="flex mr-3 group cursor-pointer">
          <User
            size={20}
            strokeWidth={1.75}
            className="group-hover:scale-110"
          />
          <div className="mx-3 group-active:text-white transition-all">
            {userState.user.username}
          </div>
        </a>
      </Link>
      <LogOut
        size={20}
        className="text-gray-500 hover:scale-110 hover:text-gray-700 cursor-pointer"
        onClick={logoutCall}
      />
    </div>
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
