import ElasticPageNavButton from "./ElasticPageNavButton";

const ElasticPagination = ({ page, clientUrl, opts }) => {
  return (
    <div className='flex justify-around my-16 md:w-4/5 lg:w-1/2 mx-auto'>
      <div className='w-1/3'>
        <ElasticPageNavButton direction='left' clientUrl={clientUrl} opts={opts} page={page} />
      </div>
      <div className='w-1/3'>
        <ElasticPageNavButton direction='right' clientUrl={clientUrl} opts={opts} page={page} />
      </div>
    </div>
  );
};

export default ElasticPagination;
