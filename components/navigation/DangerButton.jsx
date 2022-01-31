const DangerButton = ({ text }) => {
  return (
    <div className="text-center py-3 bg-white border-red-300 border-2 rounded-md cursor-pointer hover:bg-red-100 active:bg-red-200 transition-colors">
      {text}
    </div>
  );
};

export default DangerButton;
