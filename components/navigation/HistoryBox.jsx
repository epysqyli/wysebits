import { Clock, XOctagon } from "react-feather";

const HistoryBox = ({ query, removeFromStateHistory }) => {
  return (
    <div className="mx-auto flex justify-between items-center py-2 px-5 shadow rounded bg-white my-2">
      <div className="flex items-center gap-x-5">
        <Clock size={18} color="gray" />
        <div className="text-gray-500 text-sm">{query}</div>
      </div>
      <XOctagon
        size={18}
        className="cursor-pointer text-gray-500 hover:scale-110 active:scale-100 active:text-black"
        onClick={() => removeFromStateHistory(query)}
      />
    </div>
  );
};

export default HistoryBox;
