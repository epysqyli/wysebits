import { getLoggedUser, getUserStats } from "../../../lib/serverSideMethods";
import { Activity, Award, Smile, Frown } from "react-feather";
import { shortenText, slug } from "../../../lib/utils";
import Link from "next/dist/client/link";

export const getServerSideProps = async (context) => {
  const loggedUser = await getLoggedUser(context);
  const stats = await getUserStats(loggedUser.data.user.id);

  return {
    props: { entries: stats.data.entries },
  };
};

const Stats = ({ entries }) => {
  return (
    <div className="w-5/6 md:w-4/6 lg:w-11/12 xl:w-5/6 mx-auto py-10">
      <div className="flex justify-between items-center md:justify-around md:border-b-2 md:border-gray-300 md:pb-5">
        <Activity size={36} className="text-gray-800" />
        <div className="text-gray-800 text-2xl">
          Some stats for your profile
        </div>
      </div>

      <div className="mx-auto my-20 grid grid-cols-1 lg:grid-cols-3 lg:gap-x-5 gap-y-10">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 py-5 rounded text-gray-800 shadow hover:shadow-md transition-shadow">
          <div className="flex items-start justify-around border-b pb-4">
            <Award size={50} strokeWidth={1.25} className="text-gray-700" />
            <div>
              <div className="text-xl p-2 bg-blue-100 rounded-md shadow">
                Best net entry
              </div>
              <div className="my-2 text-center">
                Total net votes: {entries.best_net_entry.net_votes}
              </div>
            </div>
          </div>

          <div className="text-center my-8">
            <Link
              href={`/books/${slug(
                entries.best_net_entry.book_tile.book.title,
                entries.best_net_entry.book_tile.book.id
              )}/1`}
            >
              <div className="my-2 cursor-pointer">
                {entries.best_net_entry.book_tile.book.title}
              </div>
            </Link>
            <Link
              href={`/authors/${slug(
                entries.best_net_entry.book_tile.book.authors[0].full_name,
                entries.best_net_entry.book_tile.book.authors[0].id
              )}/1`}
            >
              <div className="my-2 text-sm italic cursor-pointer hover:text-black">
                {entries.best_net_entry.book_tile.book.authors[0].full_name}
              </div>
            </Link>
            <Link
              href={`/categories/${entries.best_net_entry.book_tile.book.category.slug}/1`}
            >
              <div className="my-2 text-sm italic cursor-pointer hover:text-black">
                {entries.best_net_entry.book_tile.book.category.name}
              </div>
            </Link>
          </div>

          <p className="mt-5 py-3 px-5 text-justify font-light text-black">
            {shortenText(entries.best_net_entry.content, 50)}
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 py-5 rounded text-gray-800 shadow hover:shadow-md transition-shadow">
          <div className="flex items-start justify-around border-b pb-4">
            <Smile size={50} strokeWidth={1.25} className="text-gray-700" />
            <div>
              <div className="text-xl p-2 bg-green-100 rounded-md shadow">
                Most upvoted
              </div>
              <div className="my-2 text-center">
                Total upvotes: {entries.most_upvoted.upvotes}
              </div>
            </div>
          </div>

          <div className="text-center my-8">
            <Link
              href={`/books/${slug(
                entries.most_upvoted.book_tile.book.title,
                entries.most_upvoted.book_tile.book.id
              )}/1`}
            >
              <div className="my-2 cursor-pointer">
                {entries.most_upvoted.book_tile.book.title}
              </div>
            </Link>
            <Link
              href={`/authors/${slug(
                entries.most_upvoted.book_tile.book.authors[0].full_name,
                entries.most_upvoted.book_tile.book.authors[0].id
              )}/1`}
            >
              <div className="my-2 text-sm italic cursor-pointer hover:text-black">
                {entries.most_upvoted.book_tile.book.authors[0].full_name}
              </div>
            </Link>
            <Link
              href={`/categories/${entries.most_upvoted.book_tile.book.category.slug}/1`}
            >
              <div className="my-2 text-sm italic cursor-pointer hover:text-black">
                {entries.most_upvoted.book_tile.book.category.name}
              </div>
            </Link>
          </div>

          <p className="mt-5 py-3 px-5 text-justify font-light text-black">
            {shortenText(entries.most_upvoted.content, 50)}
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 py-5 rounded text-gray-800 shadow hover:shadow-md transition-shadow">
          <div className="flex items-start justify-around border-b pb-4">
            <Frown size={50} strokeWidth={1.25} className="text-gray-700" />
            <div>
              <div className="text-xl p-2 bg-red-100 rounded-md shadow">
                Most downvoted
              </div>
              <div className="my-2 text-center">
                Total downvotes: {entries.most_downvoted.downvotes}
              </div>
            </div>
          </div>

          <div className="text-center my-8">
            <Link
              href={`/books/${slug(
                entries.most_downvoted.book_tile.book.title,
                entries.most_downvoted.book_tile.book.id
              )}/1`}
            >
              <div className="my-2 cursor-pointer">
                {entries.most_downvoted.book_tile.book.title}
              </div>
            </Link>
            <Link
              href={`/authors/${slug(
                entries.most_downvoted.book_tile.book.authors[0].full_name,
                entries.most_downvoted.book_tile.book.authors[0].id
              )}/1`}
            >
              <div className="my-2 text-sm italic cursor-pointer hover:text-black">
                {entries.most_downvoted.book_tile.book.authors[0].full_name}
              </div>
            </Link>
            <Link
              href={`/categories/${entries.most_downvoted.book_tile.book.category.slug}/1`}
            >
              <div className="my-2 text-sm italic cursor-pointer hover:text-black">
                {entries.most_downvoted.book_tile.book.category.name}
              </div>
            </Link>
          </div>

          <p className="mt-5 py-3 px-5 text-justify font-light text-black">
            {shortenText(entries.most_downvoted.content, 50)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
