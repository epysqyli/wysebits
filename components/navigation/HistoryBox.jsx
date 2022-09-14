import { Clock, XOctagon } from "react-feather";

const HistoryBox = ({ query, removeFromStateHistory, search }) => {
  return (
    <div className='mx-auto flex justify-between items-center py-2 px-5 shadow rounded bg-white my-2 hover:shadow-md active:shadow-inner transition-shadow'>
      <div className='w-11/12 group flex items-center gap-x-5 cursor-pointer' onClick={() => search(query)}>
        <Clock size={18} color='gray' />
        <div className='text-gray-500 text-sm group-hover:text-gray-700'>{query}</div>
      </div>
      <XOctagon
        size={18}
        className='w-1/12 cursor-pointer text-gray-500 hover:scale-110 active:scale-100 active:text-black'
        onClick={() => removeFromStateHistory(query)}
      />
    </div>
  );
};

export default HistoryBox;
