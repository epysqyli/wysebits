import Link from "next/link";
import { ArrowRight, ArrowLeft } from "react-feather";
import { ReactElement } from "react";

interface Props {
  direction: string;
  clientUrl: string;
  page: string;
  opts: any;
  isLastPage: boolean;
}

const ElasticPageNavButton = ({ direction, clientUrl, page, opts, isLastPage }: Props): ReactElement => {
  const optsKeyOne: string = opts ? Object.keys(opts)[0] : "";
  const optsValueOne: string = opts ? (Object.values(opts)[0] as string) : "";
  const optsKeyTwo: string = opts ? Object.keys(opts)[1] : "";
  const optsValueTwo: string = opts ? (Object.values(opts)[1] as string) : "";

  if (Number(page) - 1 == 0 && direction == "left")
    return (
      <div className='py-2 text-center text-gray-300 rounded shadow'>
        <ArrowLeft className='w-min mx-auto' />
      </div>
    );

  if (direction == "left")
    return (
      <Link
        href={{
          pathname: clientUrl,
          query: {
            page: Number(page) - 1,
            [optsKeyOne]: optsValueOne,
            [optsKeyTwo]: optsValueTwo
          }
        }}
      >
        <div className='py-2 text-center rounded shadow-md cursor-pointer bg-white hover:shadow-none active:shadow-inner transition-colors group'>
          <ArrowLeft className='w-min mx-auto group-hover:pr-2 text-gray-400 group-hover:text-gray-600 transition-all' />
        </div>
      </Link>
    );

  if (direction == "right" && isLastPage)
    return (
      <div className='py-2 text-center text-gray-300 rounded shadow'>
        <ArrowRight className='w-min mx-auto' />
      </div>
    );

  if (direction == "right")
    return (
      <Link
        href={{
          pathname: clientUrl,
          query: {
            page: Number(page) + 1,
            [optsKeyOne]: optsValueOne,
            [optsKeyTwo]: optsValueTwo
          }
        }}
      >
        <div className='py-2 text-center rounded shadow-md cursor-pointer bg-white hover:shadow-none active:shadow-inner transition-colors group'>
          <ArrowRight className='w-min mx-auto group-hover:pl-2 text-gray-400 group-hover:text-gray-600 transition-all' />
        </div>
      </Link>
    );
};

export default ElasticPageNavButton;
