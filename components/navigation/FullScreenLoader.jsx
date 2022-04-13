import { Loader } from "react-feather";

const FullScreenLoader = () => {
  return (
    <div className="fixed w-full h-screen z-50 bg-gray-200 bg-opacity-25">
      <div className="w-min animate-spin mx-auto mt-20">
        <Loader
          size={40}
          color="black"
          className="absolute -translate-x-1/2 -translate-y-1/2 border rounded-full p-2 bg-white"
        />
      </div>
    </div>
  );
};

export default FullScreenLoader;
