import { getEntries } from "../../lib/serverSideMethods";
import FeedEntry from "../../components/feed/FeedEntry";

export const getServerSideProps = async () => {
  const entries = await getEntries();

  return {
    props: { entries: entries.data.entries, pagy: entries.data.pagy },
  };
};

const Feed = ({ entries, pagy, userState }) => {
  return (
    <div>
      <div className="bg-feed bg-cover bg-center shadow">
        <div className="bg-gray-800 bg-opacity-70 text-white text-3xl font-medium text-center py-12">
          Latest insights from all creators
        </div>
      </div>
    </div>
  );
};

export default Feed;
