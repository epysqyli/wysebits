const WelcomeTop = ({ text, bcgImg }) => {
  return (
    <div
      className={`h-36 md:h-52 ${bcgImg} bg-cover bg-center lg:shadow-md group animate-show-up lg:w-4/5 lg:mt-5 lg:rounded-md mx-auto border-b-2 border-white`}
    >
      <div className="bg-gray-800 h-full bg-opacity-70 relative transition active:bg-gray-900 lg:rounded-md">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12">
          <div className="text-white text-2xl md:text-3xl lg:text-5xl font-bold text-center transition">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeTop;
