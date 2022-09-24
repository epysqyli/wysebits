import ElasticPageNavButton from "./ElasticPageNavButton";

interface Props {
  page: string;
  clientUrl: string;
  opts: any;
  amountOfResults: number;
  perPage: number;
}

const ElasticPagination = ({ page, clientUrl, opts, amountOfResults, perPage }: Props) => {
  const lowerBoundary: number = (Number(page) - 1) * perPage;
  const upperBoundary: number = Number(page) * perPage;

  const isLastPage: boolean = amountOfResults < upperBoundary && amountOfResults >= lowerBoundary;

  return (
    <div className='flex justify-around my-16 md:w-4/5 lg:w-1/2 mx-auto'>
      <div className='w-1/3'>
        <ElasticPageNavButton
          direction='left'
          clientUrl={clientUrl}
          opts={opts}
          page={page}
          isLastPage={isLastPage}
        />
      </div>
      <div className='w-1/3'>
        <ElasticPageNavButton
          direction='right'
          clientUrl={clientUrl}
          opts={opts}
          page={page}
          isLastPage={isLastPage}
        />
      </div>
    </div>
  );
};

export default ElasticPagination;
