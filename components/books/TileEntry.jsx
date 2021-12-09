import { ThumbsUp, ThumbsDown, ArrowUpRight } from "react-feather";
import slugify from "slugify";
import Link from "next/dist/client/link";
import EntryLogged from "./tile-entry-components/EntryLogged";
import EntryGuest from "./tile-entry-components/EntryGuest";
import EntryLoggedTitle from "./tile-entry-components/EntryLoggedTitle";
import EntryGuestTitle from "./tile-entry-components/EntryGuestTitle";

const TileEntry = ({
  data,
  showTitle,
  userId,
  insights,
  addInsightToState,
  removeInsightFromState,
  isLogged,
}) => {
  if (isLogged) {
    if (showTitle) {
      return (
        <EntryLoggedTitle
          data={data}
          insights={insights}
          addInsightToState={addInsightToState}
          removeInsightFromState={removeInsightFromState}
          userId={userId}
        />
      );
    } else {
      return (
        <div className="bg-white text-justify leading-6 shadow rounded-md hover:shadow-md transition-all">
          <EntryLogged
            data={data}
            insights={insights}
            addInsightToState={addInsightToState}
            removeInsightFromState={removeInsightFromState}
            userId={userId}
          />
        </div>
      );
    }
  } else {
    if (showTitle) {
      return <EntryGuestTitle data={data} />;
    } else {
      return (
        <div className="bg-white text-justify leading-6 shadow rounded-md hover:shadow-md transition-all">
          <EntryGuest data={data} />
        </div>
      );
    }
  }
};

export default TileEntry;
