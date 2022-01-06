import { useState } from "react";
import { FilePlus } from "react-feather";
import TileEntry from "../../../components/books/TileEntry";
import CardBcg from "../../../components/books/CardBcg";
import NoItem from "../../../components/users/NoItem";
import PageNavButton from "../../../components/navigation/PageNavButton";
import Link from "next/dist/client/link";
import Head from "next/head";

import {
  getBookEntries,
  getAllFollowing,
  getLoggedUser,
  getFavBooks,
  getFavEntries,
  getUpvotedEntries,
  getDownvotedEntries,
  getBook,
} from "../../../lib/serverSideMethods";

export const getServerSideProps = async (context) => {
  const slug = context.query.slug;
  const splitSlug = context.query.slug.split("-");
  const id = splitSlug[splitSlug.length - 1];
  const pageNum = context.query.page;
  const title = splitSlug.slice(0, splitSlug.length - 1).join(" ");
  const capTitle = title.slice(0, 1).toUpperCase() + title.slice(1);

  const book = await getBook(id);
  const entries = await getBookEntries(id, pageNum);

  try {
    const loggedUser = await getLoggedUser(context);
    const following = await getAllFollowing(loggedUser, context);
    const favBooks = await getFavBooks(loggedUser, context);
    const favInsights = await getFavEntries(loggedUser, context);
    const upvotedEntries = await getUpvotedEntries(loggedUser, context);
    const downvotedEntries = await getDownvotedEntries(loggedUser, context);

    if (entries.data.entries.length != 0) {
      return {
        props: {
          entries: entries.data.entries,
          title: capTitle,
          book: book.data,
          favBooks: favBooks.data.books,
          pagy: entries.data.pagy,
          slug: slug,
          following: following.data,
          favInsights: favInsights.data.tile_entries,
          entriesUp: upvotedEntries.data.upvoted_entries,
          entriesDown: downvotedEntries.data.downvoted_entries,
        },
      };
    } else {
      return {
        props: {
          entries: false,
          title: capTitle,
          book: book.data,
          favBooks: favBooks.data.books,
          pagy: entries.data.pagy,
          slug: slug,
          following: following.data,
        },
      };
    }
  } catch (error) {
    if (entries.data.entries != null) {
      return {
        props: {
          entries: entries.data.entries,
          title: capTitle,
          book: book.data,
          favBooks: [],
          pagy: entries.data.pagy,
          slug: slug,
        },
      };
    } else {
      return {
        props: {
          entries: false,
          title: capTitle,
          book: book.data,
          favBooks: [],
          pagy: entries.data.pagy,
          slug: slug,
        },
      };
    }
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
}) => {
  const [followedUsers, setFollowedUsers] = useState(following);
  const [insights, setInsights] = useState(favInsights);
  const [upvotedEntries, setUpvotedEntries] = useState(entriesUp);
  const [downvotedEntries, setDownvotedEntries] = useState(entriesDown);

  const clientUrl = `/books/${slug}`;

  if (entries && entries.length != 0)
    return (
      <div>
        <Head>
          <title>WyseBits - {book.title}</title>
        </Head>
        <CardBcg bookData={book} userState={userState} favBooks={favBooks} />
        <div className="my-10 w-4/5 md:w-3/5 mx-auto grid gap-y-10 lg:w-4/5 lg:grid-cols-2 lg:gap-x-6">
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
                />
              </div>
            );
          })}
        </div>
        <div className="flex items-center my-16 w-4/5 md:w-4/6 mx-auto gap-x-4">
          <div className="w-1/2">
            <PageNavButton
              btnText="Previous page"
              url={pagy.prev_url}
              clientUrl={clientUrl}
            />
          </div>
          <div className="w-1/2">
            <PageNavButton
              btnText="Next page"
              url={pagy.next_url}
              clientUrl={clientUrl}
            />
          </div>
        </div>
      </div>
    );

  return (
    <div className="pb-20">
      <Head>
        <title>WyseBits - {book.title}</title>
      </Head>
      <CardBcg bookData={book} userState={userState} favBooks={favBooks} />
      <div className="w-4/5 md:w-4/6 lg:w-3/6 mx-auto">
        <NoItem message="It appears as though there are no insights for this book yet ..." />
        <Link href={`/users/book-tiles/create/${book.id}`}>
          <div className="border px-5 py-3 bg-gray-100 rounded-md shadow group transition-all cursor-pointer hover:shadow-md">
            Be the first and share your knowledge by adding your own insights
            for <b>{title}</b> now!
            <FilePlus
              className="mt-10 mb-2 mx-auto group-hover:scale-110 transition-all group-active:text-gray-400"
              size={36}
              strokeWidth={1}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Book;
