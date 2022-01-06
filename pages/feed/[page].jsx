import { getEntries } from "../../lib/serverSideMethods";
import FeedEntry from "../../components/feed/FeedEntry";

export const getServerSideProps = async () => {
  const entries = await getEntries();

  return {
    props: { entries: entries.data.entries, pagy: entries.data.pagy },
  };
};

const Feed = ({ entries, pagy, userState }) => {
  return <div></div>;
};

export default Feed;
