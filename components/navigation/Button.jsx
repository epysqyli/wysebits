const Button = ({ text }) => {
  return (
    <div className="text-center py-3 px-5 rounded-lg bg-white shadow-md cursor-pointer active:shadow-inner transition-shadow">
      {text}
    </div>
  );
};

export default Button;
