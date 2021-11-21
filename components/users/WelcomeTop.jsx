const WelcomeTop = ({ firstLine, secondLine }) => {
  return (
    <div className="text-2xl mt-12 text-center bg-white border py-5 shadow-md">
      <div>{firstLine}</div>
      <div className="mt-2">{secondLine}</div>
    </div>
  );
};

export default WelcomeTop;
