import { Info } from "react-feather";

const NoResults = () => {
  return (
    <div className="flex items-center justify-center gap-x-5 w-4/5 mx-auto mt-10">
      <Info size={36} strokeWidth={1.5} className="text-gray-600" />
      <div className="text-lg">No results</div>
    </div>
  );
};

export default NoResults;
