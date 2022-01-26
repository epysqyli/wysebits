import { Loader } from "react-feather";

const FullScreenLoader = () => {
  return (
    <div className="fixed w-full h-screen z-10 bg-gray-200 bg-opacity-50">
      <div className="w-min animate-spin mx-auto mt-60">
        <Loader
          size={48}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
};

export default FullScreenLoader;
