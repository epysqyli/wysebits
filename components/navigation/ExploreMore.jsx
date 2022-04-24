import MultiSearch from "./MultiSearch";
import NoItem from "../users/NoItem";

const ExploreMore = ({ message, body, exortation }) => {
  return (
    <div className="mx-auto w-11/12 md:w-4/6 lg:w-3/6 xl:w-2/6 2xl:w-1/3 py-20 lg:py-40 2xl:py-48">
      <NoItem message={message} />
      <div className="border px-5 pt-3 md:px-8 md:pt-5 mt-20 lg:mt-32 bg-gray-100 rounded-md shadow group transition-all hover:shadow-md">
        <div>
          {body}
          <br />
          <br /> <div className="text-center mt-5">{exortation}</div>
        </div>
        <div className="my-10">
          <MultiSearch />
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
