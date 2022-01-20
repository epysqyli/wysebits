const WelcomeTop = ({ text, bcgImg }) => {
  return (
    <div
      className={`h-36 ${bcgImg} bg-cover bg-center shadow-md hover:shadow-lg group animate-show-up`}
    >
      <div className="bg-gray-800 h-full bg-opacity-70 relative group-hover:bg-opacity-75 transition active:bg-gray-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="text-white text-2xl font-bold text-center group-hover:scale-105 transition">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeTop;
