import { Info } from "react-feather";

const NoResults = () => {
  return (
    <div className="flex items-center justify-center gap-x-5 w-11/12 mx-auto mt-20">
      <Info
        size={36}
        strokeWidth={1.5}
        className="text-gray-50"
        fill="lightgray"
      />
      <div className="text-lg md:text-2xl text-gray-50">No results</div>
    </div>
  );
};

export default NoResults;
