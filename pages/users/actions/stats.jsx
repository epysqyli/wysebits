import { getLoggedUser, getUserStats } from "../../../lib/serverSideMethods";
import { Activity, Award, Smile, Frown } from "react-feather";
import { shortenText } from "../../../lib/utils";

export const getServerSideProps = async (context) => {
  const loggedUser = await getLoggedUser(context);
  const stats = await getUserStats(loggedUser.data.user.id);

  return {
    props: { entries: stats.data.entries },
  };
};

const Stats = ({ entries }) => {
  return (
    <div className="w-5/6 mx-auto py-10">
      <div className="flex justify-between items-center md:justify-around md:border-b-2 md:border-gray-300 md:pb-2">
        <Activity size={36} className="text-gray-800" />
        <div className="text-gray-800 text-2xl">
          Some stats for your profile
        </div>
      </div>

      <div className="mx-auto my-10 grid grid-cols-1 gap-y-10">
        <div className="bg-gray-50 py-5 rounded text-gray-800 shadow">
          <div className="flex items-center justify-around">
            <Award size={36} strokeWidth={1.5} className="text-gray-700" />
            <div>
              <div className="text-xl">Best net entry</div>
              <div className="my-2">
                Total net votes: {entries.best_net_entry.net_votes}
              </div>
            </div>
          </div>

          <div className="text-center my-8">
            <div className="my-2">
              {entries.best_net_entry.book_tile.book.title}
            </div>
            <div className="my-2">
              {entries.best_net_entry.book_tile.book.authors[0].full_name}
            </div>
          </div>

          <p className="mt-5 p-3 text-justify font-light text-black">
            {shortenText(entries.best_net_entry.content, 50)}
          </p>
        </div>

        <div className="bg-gray-50 py-5 rounded text-gray-800 shadow">
          <div className="flex items-center justify-around">
            <Smile size={36} strokeWidth={1.5} className="text-gray-700" />
            <div>
              <div className="text-xl">Most upvoted entry</div>
              <div className="my-2">
                Total upvotes: {entries.most_upvoted.upvotes}
              </div>
            </div>
          </div>

          <div className="text-center my-8">
            <div className="my-2">
              {entries.most_upvoted.book_tile.book.title}
            </div>
            <div className="my-2">
              {entries.most_upvoted.book_tile.book.authors[0].full_name}
            </div>
          </div>

          <p className="mt-5 p-3 text-justify font-light text-black">
            {shortenText(entries.most_upvoted.content, 50)}
          </p>
        </div>

        <div className="bg-gray-50 py-5 rounded text-gray-800 shadow">
          <div className="flex items-center justify-around">
            <Frown size={36} strokeWidth={1.5} className="text-gray-700" />
            <div>
              <div className="text-xl">Most downvoted entry</div>
              <div className="my-2">
                Total downvotes: {entries.most_downvoted.downvotes}
              </div>
            </div>
          </div>

          <div className="text-center my-8">
            <div className="my-2">
              {entries.most_downvoted.book_tile.book.title}
            </div>
            <div className="my-2">
              {entries.most_downvoted.book_tile.book.authors[0].full_name}
            </div>
          </div>

          <p className="mt-5 p-3 text-justify font-light text-black">
            {shortenText(entries.most_downvoted.content, 50)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
