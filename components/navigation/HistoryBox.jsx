import { Clock, XOctagon } from "react-feather";

const HistoryBox = ({ query }) => {
  return (
    <div className="w-4/5 mx-auto flex justify-between items-center py-2 px-5 shadow rounded bg-white my-2">
      <div className="flex items-center gap-x-5">
        <Clock size={18} color="gray" />
        <div className="text-gray-500 text-sm">{query}</div>
      </div>
      <XOctagon size={18} color="gray" />
    </div>
  );
};

export default HistoryBox;
