const WelcomeTop = ({ firstLine, secondLine }) => {
  return (
    <div className="text-2xl text-center bg-white py-5 shadow-md">
      <div>{firstLine}</div>
      <div className="mt-2">{secondLine}</div>
    </div>
  );
};

export default WelcomeTop;
