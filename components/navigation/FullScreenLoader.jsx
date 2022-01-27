import { Loader } from "react-feather";

const FullScreenLoader = () => {
  return (
    <div className="fixed w-full h-screen z-30 bg-gray-200 bg-opacity-50">
      <div className="w-min animate-spin mt-10 ml-10 mr-auto">
        <Loader
          size={40}
          color="black"
          className="absolute -translate-x-1/2 -translate-y-1/2 border rounded-full p-2 shadow bg-white"
        />
      </div>
    </div>
  );
};

export default FullScreenLoader;
