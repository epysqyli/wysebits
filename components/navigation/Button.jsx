const Button = ({ text }) => {
  return (
    <div className="text-center py-3 border rounded-lg bg-white shadow-sm hover:shadow-lg hover:bg-gray-500 active:bg-gray-700 hover:text-white cursor-pointer active:shadow-lg transition-colors">
      {text}
    </div>
  );
};

export default Button;