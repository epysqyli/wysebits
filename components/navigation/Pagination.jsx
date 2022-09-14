import PageNavButton from "./PageNavButton";

const Pagination = ({ pagy, clientUrl, opts }) => {
  if (pagy.prev === null && pagy.next === null) return null;

  return (
    <div className='flex justify-around my-16 md:w-4/5 lg:w-1/2 mx-auto'>
      <div className='w-1/3'>
        <PageNavButton direction='left' clientUrl={clientUrl} url={pagy.prev_url} opts={opts} />
      </div>
      <div className='w-1/3'>
        <PageNavButton direction='right' clientUrl={clientUrl} url={pagy.next_url} opts={opts} />
      </div>
    </div>
  );
};

export default Pagination;
