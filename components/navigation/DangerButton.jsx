const DangerButton = ({ text }) => {
  return (
    <div className="text-center py-3 text-sm border rounded-lg bg-gray-200 shadow-sm hover:shadow-lg hover:bg-gray-500 active:bg-gray-700 hover:text-white cursor-pointer active:shadow-lg transition-colors">
      {text}
    </div>
  );
};

export default DangerButton;
