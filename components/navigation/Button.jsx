const Button = ({ text }) => {
  return (
    <div className="text-center py-3 px-5 rounded-lg bg-white shadow hover:shadow-lg hover:bg-gray-500 hover:text-white cursor-pointer active:shadow-inner transition-colors">
      {text}
    </div>
  );
};

export default Button;
