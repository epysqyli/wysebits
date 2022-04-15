import EntryGuestTitle from "../books/tile-entry-components/EntryGuestTitle";
import Banner from "./Banner";

const TrendingEntry = ({ entry, userId }) => {
  return (
    <div>
      <Banner text="Insight" iconProp="insight" />
      <div className="mt-5">
        <EntryGuestTitle entryProp={entry} userId={userId} />
      </div>
    </div>
  );
};

export default TrendingEntry;
