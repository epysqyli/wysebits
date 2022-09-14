const Button = ({ text }) => {
  return (
    <div className='text-center py-3 text-gray-800 rounded-md bg-white shadow-md cursor-pointer active:shadow-inner active:bg-gray-100 transition-all'>
      {text}
    </div>
  );
};

export default Button;
