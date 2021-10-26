import { LogIn } from "react-feather";

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-gray-300 py-2 px-5 text-center w-screen fixed z-10 shadow-sm">
      <div className="text-2xl font-bold">Wbits.</div>
      <div className="flex items-center group cursor-pointer">
        <LogIn size={20} className="group-hover:scale-110 transition-all" />
        <div className="mx-3 group-active:text-white">Login</div>
      </div>
    </header>
  );
};

export default Header;
