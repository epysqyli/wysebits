const WelcomeTop = ({ firstLine, secondLine }) => {
  return (
    <div className="text-2xl mt-16 text-center border-b-2 pb-2 shadow-md">
      <div>{firstLine}</div>
      <div className="mt-2">{secondLine}</div>
    </div>
  );
};

export default WelcomeTop;
