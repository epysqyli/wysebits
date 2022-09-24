import EntryGuestTitle from "../books/tile-entry-components/EntryGuestTitle";
import Banner from "./Banner";

const TrendingEntry = ({ entry, userId, addOverlay, removeOverlay }) => {
  return (
    <div>
      <Banner text='Insight' iconProp='insight' />
      <div className='mt-5'>
        <EntryGuestTitle
          entryProp={entry}
          userId={userId}
          addOverlay={addOverlay}
          removeOverlay={removeOverlay}
        />
      </div>
    </div>
  );
};

export default TrendingEntry;
