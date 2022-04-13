import { useState } from "react";
import Head from "next/head";
import { getUser, getBookTiles } from "../../../lib/serverSideMethods";
import BookCard from "../../../components/books/BookCard";
import Pagination from "../../../components/navigation/Pagination";
import BookUserInsights from "../../../components/creators/BookUserInsights";
import { getBookUserInsights } from "../../../lib/creatorMethods";
import { searchWithinBookTiles } from "../../../lib/searchMethods";
import SpecificSearch from "../../../components/search/SpecificSearch";
import NoResults from "../../../components/search/NoResults";

import {
  getLoggedUser,
  getAllFollowing,
  getFavEntries,
  getUpvotedEntries,
  getDownvotedEntries,
} from "../../../lib/serverSideMethods";

import { Meh } from "react-feather";
import WelcomeTop from "../../../components/users/WelcomeTop";

export const getServerSideProps = async (context) => {
  const username = context.params.username;
  const pageNum = context.query.page;
  const user = await getUser(username);

  let bookTiles;
  if (context.query.searchTerms === undefined) {
    bookTiles = await getBookTiles(user, pageNum);
  } else {
    const keywords = context.query.searchTerms;
    bookTiles = await searchWithinBookTiles(
      user.data.user.id,
      keywords,
      pageNum
    );
  }

  const pagy = bookTiles.data.pagy;
  const books = bookTiles.data.tiles.map((tile) => tile.book);

  try {
    const loggedUser = await getLoggedUser(context);
    const following = await getAllFollowing(loggedUser, context);
    const favTileEntries = await getFavEntries(loggedUser, context, pageNum);
    const upvotedEntries = await getUpvotedEntries(loggedUser, context);
    const downvotedEntries = await getDownvotedEntries(loggedUser, context);
    return {
      props: {
        books: books,
        pagy: pagy,
        username: username,
        userId: user.data.user.id,
        favInsights: favTileEntries.data.tile_entries,
        following: following.data,
        entriesUp: upvotedEntries.data.upvoted_entries,
        entriesDown: downvotedEntries.data.downvoted_entries,
        currentSearchTerms: context.query.searchTerms ?? null,
        searchParams: context.query.searchTerms
          ? { searchTerms: context.query.searchTerms }
          : null,
      },
    };
  } catch (error) {
    return {
      props: {
        books: books,
        pagy: pagy,
        username: username,
        userId: user.data.user.id,
        currentSearchTerms: context.query.searchTerms ?? null,
        searchParams: context.query.searchTerms
          ? { searchTerms: context.query.searchTerms }
          : null,
      },
    };
  }
};

const UserBooks = ({
  books,
  pagy,
  username,
  userId,
  userState,
  favInsights,
  following,
  entriesUp,
  entriesDown,
  currentSearchTerms,
  searchParams,
  removeOverlay,
  addOverlay
}) => {
  const clientUrl = `/creators/${username}/books`;

  const [followedUsers, setFollowedUsers] = useState(following);
  const [insights, setInsights] = useState(
    favInsights !== undefined
      ? favInsights.filter((insight) => insight !== null)
      : null
  );
  const [upvotedEntries, setUpvotedEntries] = useState(entriesUp);
  const [downvotedEntries, setDownvotedEntries] = useState(entriesDown);

  const [showInsights, setShowInsights] = useState(false);
  const [bookInsights, setBookInsights] = useState([]);

  const showBookInsights = async (bookId) => {
    addOverlay();
    const resp = await getBookUserInsights(userId, bookId);
    setBookInsights(resp.data);
    showInsights === false ? setShowInsights(true) : setShowInsights(false);
  };

  const closeBookInsight = () => {
    removeOverlay();
    setShowInsights(false);
  };

  if (books.length === 0 && currentSearchTerms)
    return (
      <div className="pt-10 lg:pt-16">
        <Head>
          <title>Books read by {username}</title>
          <link rel="icon" href="/logo.png" />
        </Head>

        <WelcomeTop
          bcgImg="bg-check-book-tiles"
          text={`All books contributed to by ${username}`}
        />

        <div className="mt-5">
          <SpecificSearch
            placeholder="search within books"
            baseUrl={`/creators/${username}/books`}
            currentSearchTerms={currentSearchTerms}
          />
        </div>

        <NoResults />
      </div>
    );

  if (books.length === 0)
    return (
      <div className="pt-10 lg:pt-16">
        <Head>
          <title>Books read by {username}</title>
          <link rel="icon" href="/logo.png" />
        </Head>

        <WelcomeTop
          bcgImg="bg-check-book-tiles"
          text={`All books contributed to by ${username}`}
        />

        <div className="mx-auto w-4/5 text-center my-20 text-xl">
          <div className="mx-auto w-min mb-20 animate-bounce">
            <Meh
              size={48}
              color="white"
              strokeWidth={1.75}
              className="animate-spin"
            />
          </div>
          <div className="md:w-3/5 mx-auto lg:w-2/5 text-gray-50">
            {username} is yet to publish contributions to the books he or she
            has read
          </div>
        </div>
      </div>
    );

  return (
    <div className="relative pt-10 lg:pt-16">
      <Head>
        <title>Books read by {username}</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <WelcomeTop
        bcgImg="bg-check-book-tiles"
        text={`All books contributed to by ${username}`}
      />

      <div className="mt-5">
        <SpecificSearch
          placeholder="search within books"
          baseUrl={`/creators/${username}/books`}
          currentSearchTerms={currentSearchTerms}
        />
      </div>

      <div>
        <div className="py-10 w-11/12 lg:w-4/5 xl:w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
          {books.map((book) => {
            return (
              <div key={book.id}>
                <div onClick={() => showBookInsights(book.id)}>
                  <div className="rounded-md bg-white shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all cursor-pointer active:shadow-inner border-b-2 border-blue-200 hover:border-blue-300">
                    <BookCard bookData={book} />
                  </div>
                </div>
                {showInsights === true ? (
                  <BookUserInsights
                    closeInsight={closeBookInsight}
                    bookInsights={bookInsights}
                    user={userState}
                    insights={insights}
                    setInsights={setInsights}
                    upvotedEntries={upvotedEntries}
                    setUpvotedEntries={setUpvotedEntries}
                    downvotedEntries={downvotedEntries}
                    setDownvotedEntries={setDownvotedEntries}
                    followedUsers={followedUsers}
                    setFollowedUsers={setFollowedUsers}
                  />
                ) : null}
              </div>
            );
          })}
        </div>

        <Pagination clientUrl={clientUrl} pagy={pagy} opts={searchParams} />
      </div>
    </div>
  );
};

export default UserBooks;
