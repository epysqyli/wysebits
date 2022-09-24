import { AlertCircle } from "react-feather";

const NoItem = ({ message }) => {
  return (
    <>
      <div className='mx-auto px-2 py-1'>
        <div className='w-min mx-auto mb-10'>
          <AlertCircle size={42} strokeWidth={1.5} className='rounded-3xl text-gray-100' fill='transparent' />
        </div>
        <div className='md:text-lg text-gray-100 text-center'>{message}</div>
      </div>
    </>
  );
};

export default NoItem;
