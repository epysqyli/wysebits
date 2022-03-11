import EntryGuestTitle from "../books/tile-entry-components/EntryGuestTitle";
import Banner from "./Banner";

const TrendingEntry = ({ entry }) => {
  return (
    <div>
      <Banner text="Insight" iconProp="insight" />
      <div className="mt-5">
        <EntryGuestTitle entryProp={entry} />
      </div>
    </div>
  );
};

export default TrendingEntry;
