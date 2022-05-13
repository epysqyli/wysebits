import { useState } from "react";
import { Bookmark, FilePlus, UserPlus } from "react-feather";
import TileEntry from "../../components/books/TileEntry";
import CardBcg from "../../components/books/CardBcg";
import NoItem from "../../components/users/NoItem";
import PageNavButton from "../../components/navigation/PageNavButton";
import Recommendations from "../../components/books/Recommendations";
import Link from "next/dist/client/link";

import { isLogged } from "../../lib/auth";

import {
  getBookEntries,
  getAllFollowing,
  getLoggedUser,
  getAllFavEntries,
  getUpvotedEntries,
  getDownvotedEntries,
  getBook,
  getCategoryRecommendations,
  getAllFavBooks,
} from "../../lib/serverSideMethods";
import IconAndTitle from "../../components/layout/IconAndTitle";

export const getServerSideProps = async (context) => {
  const slug = context.query.slug;
  const splitSlug = context.query.slug.split("-");
  const id = splitSlug[splitSlug.length - 1];
  const pageNum = context.query.page;
  const title = splitSlug.slice(0, splitSlug.length - 1).join(" ");
  const capTitle = title.slice(0, 1).toUpperCase() + title.slice(1);

  const book = await getBook(id);
  const entries = await getBookEntries(id, pageNum);
  const recommendations = await getCategoryRecommendations(book.data.id);

  if (isLogged(context)) {
    const loggedUser = await getLoggedUser(context);

    const [following, favBooks, favInsights, upvotedEntries, downvotedEntries] =
      await Promise.all([
        getAllFollowing(loggedUser, context),
        getAllFavBooks(loggedUser, context),
        getAllFavEntries(loggedUser, context),
        getUpvotedEntries(loggedUser, context),
        getDownvotedEntries(loggedUser, context),
      ]);

    return {
      props: {
        entries: entries.data.entries,
        title: capTitle,
        book: book.data,
        favBooks: favBooks.data,
        pagy: entries.data.pagy,
        slug: slug,
        following: following.data,
        favInsights: favInsights.data.tile_entries,
        entriesUp: upvotedEntries.data.upvoted_entries,
        entriesDown: downvotedEntries.data.downvoted_entries,
        recommendations: recommendations.data,
      },
    };
  } else {
    return {
      props: {
        entries: entries.data.entries || null,
        title: capTitle,
        book: book.data,
        favBooks: [],
        pagy: entries.data.pagy,
        slug: slug,
        recommendations: recommendations.data,
      },
    };
  }
};

const Book = ({
  entries,
  title,
  book,
  userState,
  favBooks,
  slug,
  pagy,
  following,
  favInsights,
  entriesUp,
  entriesDown,
  recommendations,
  addOverlay,
  removeOverlay
}) => {
  const [followedUsers, setFollowedUsers] = useState(following);
  const [insights, setInsights] = useState(favInsights);
  const [upvotedEntries, setUpvotedEntries] = useState(entriesUp);
  const [downvotedEntries, setDownvotedEntries] = useState(entriesDown);

  const clientUrl = `/books/${slug}`;

  if (entries && entries.length !== 0)
    return (
      <div className="pt-10 lg:pt-16">
        <IconAndTitle title={book.title}/>
        <CardBcg bookData={book} userState={userState} favBooks={favBooks} />
        <div className="my-10 w-11/12 md:w-3/5 2xl:w-2/3 mx-auto grid gap-y-10 lg:w-4/5 lg:grid-cols-2 lg:gap-x-6">
          {entries.map((entry) => {
            return (
              <div
                key={entry.id}
                className="bg-white text-justify leading-6 shadow rounded-md hover:shadow-md transition-all"
              >
                <TileEntry
                  entryProp={entry}
                  user={userState.user}
                  isLogged={userState.isLogged}
                  insights={insights}
                  setInsights={setInsights}
                  upvotedEntries={upvotedEntries}
                  setUpvotedEntries={setUpvotedEntries}
                  downvotedEntries={downvotedEntries}
                  setDownvotedEntries={setDownvotedEntries}
                  followedUsers={followedUsers}
                  setFollowedUsers={setFollowedUsers}
                  addOverlay={addOverlay}
                  removeOverlay={removeOverlay}
                />
              </div>
            );
          })}
        </div>

        {pagy.prev === null && pagy.next === null ? null : (
          <div className="flex justify-around my-16 md:w-4/5 lg:w-1/2 mx-auto">
            <div className="w-1/3">
              <PageNavButton
                direction="left"
                clientUrl={clientUrl}
                url={pagy.prev_url}
              />
            </div>
            <div className="w-1/3">
              <PageNavButton
                direction="right"
                clientUrl={clientUrl}
                url={pagy.next_url}
              />
            </div>
          </div>
        )}

        {recommendations.length !== 0 ? (
          <div>
            <div className="w-4/5 mx-auto flex items-center justify-around border-t pt-5 lg:pt-10">
              <Bookmark
                className="w-1/5"
                size={48}
                strokeWidth={1.5}
                color="white"
              />
              <div className="w-3/5 text-2xl text-gray-50">
                Recommeded books from the {book.category.name} category
              </div>
            </div>
            <div className="mx-auto pt-10 pb-16 w-11/12 md:w-5/6 xl:w-4/6 grid grid-cols-1 md:grid-cols-2 gap-x-2 lg:gap-x-10 gap-y-10 mt-10">
              <Recommendations recommendations={recommendations} />
            </div>
          </div>
        ) : null}
      </div>
    );

  return (
    <div className="pt-10 lg:pt-16">
      <IconAndTitle title={book.title}/>
      <CardBcg bookData={book} userState={userState} favBooks={favBooks} />
      <div className="mx-auto w-4/5 md:w-4/6 lg:w-3/6 2xl:w-1/3 py-20 lg:py-40 2xl:py-48">
        <NoItem message="There are no insights for this book yet" />
        {userState.isLogged ? (
          <Link href={`/users/book-tiles/create/${book.id}`}>
            <div className="border px-5 pt-3 md:px-8 md:py-5 mt-20 lg:mt-32 bg-gray-50 rounded-md shadow group transition-all cursor-pointer hover:shadow-md text-center lg:w-4/5 mx-auto">
              Be the first and share your knowledge by adding your own insights
              for <b>{title}</b> now!
              <FilePlus
                className="mt-10 mb-2 mx-auto group-hover:scale-110 transition-all group-active:text-gray-400"
                size={36}
                strokeWidth={1}
              />
            </div>
          </Link>
        ) : (
          <Link href="/registrations/signup">
            <div className="border px-5 pt-3 md:px-8 md:py-5 mt-20 lg:mt-32 bg-gray-50 rounded-md shadow group transition-all cursor-pointer hover:shadow-md text-center lg:w-4/5 mx-auto">
              Signup to be the first to share your knowledge by adding your own
              insights for <b>{title}</b> now!
              <UserPlus
                className="mt-10 mb-2 mx-auto group-hover:scale-110 transition-all group-active:text-gray-400"
                size={36}
                strokeWidth={1.5}
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Book;
