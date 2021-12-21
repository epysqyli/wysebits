import Link from "next/dist/client/link";

const Footer = () => {
  return (
    <footer>
      <div className="h-60 lg:h-48 xl:h-40 mx-auto bg-bottom-home bg-cover bg-center">
        <div className="bg-gray-800 h-full bg-opacity-80 relative">
          <div className="w-4/6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="text-3xl font-bold text-gray-200 text-center">
              <Link href="/about">
                <div className="hover:scale-105 active:scale-110 cursor-pointer">Wbits.</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
