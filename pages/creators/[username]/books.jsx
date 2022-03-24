import { useState } from "react";
import Head from "next/head";
import { getUser, getBookTiles } from "../../../lib/serverSideMethods";
import BookCard from "../../../components/books/BookCard";
import Pagination from "../../../components/navigation/Pagination";
import BookUserInsights from "../../../components/creators/BookUserInsights";
import { getBookUserInsights } from "../../../lib/creatorMethods";
import { searchWithinFavBooks } from "../../../lib/searchMethods";
import SpecificSearch from "../../../components/search/SpecificSearch";

import {
  getLoggedUser,
  getAllFollowing,
  getFavEntries,
  getUpvotedEntries,
  getDownvotedEntries,
} from "../../../lib/serverSideMethods";

import { Meh } from "react-feather";

export const getServerSideProps = async (context) => {
  const username = context.params.username;
  const pageNum = context.query.page;
  const user = await getUser(username);
  const bookTiles = await getBookTiles(user, pageNum);
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
      },
    };
  } catch (error) {
    return {
      props: {
        books: books,
        pagy: pagy,
        username: username,
        userId: user.data.user.id,
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
}) => {
  const clientUrl = `/creators/${username}/books`;

  const [followedUsers, setFollowedUsers] = useState(following);
  const [insights, setInsights] = useState(
    favInsights.filter((insight) => insight !== null)
  );
  const [upvotedEntries, setUpvotedEntries] = useState(entriesUp);
  const [downvotedEntries, setDownvotedEntries] = useState(entriesDown);

  const [showInsights, setShowInsights] = useState(false);
  const [bookInsights, setBookInsights] = useState([]);

  const showBookInsights = async (bookId) => {
    const resp = await getBookUserInsights(userId, bookId);
    setBookInsights(resp.data);
    showInsights === false ? setShowInsights(true) : setShowInsights(false);
  };

  const closeBookInsight = () => setShowInsights(false);

  if (books.length !== 0)
    return (
      <div>
        <Head>
          <title>Books read by {username}</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <div className="bg-check-book-tiles bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto">
          <div className="bg-gray-800 bg-opacity-70 text-white text-4xl font-bold text-center py-16 lg:rounded-md">
            <div className="mx-auto w-4/5">
              All books contributed to by {username}
            </div>
          </div>
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

          <Pagination clientUrl={clientUrl} pagy={pagy} />
        </div>
      </div>
    );

  if (books.length === 0)
    return (
      <>
        <Head>
          <title>Books read by {username}</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <div className="bg-check-book-tiles bg-cover bg-center shadow lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md mx-auto">
          <div className="bg-gray-800 bg-opacity-70 text-white text-4xl font-bold text-center py-16 lg:rounded-md">
            <div className="mx-auto w-4/5">
              All books contributed to by {username}
            </div>
          </div>
        </div>

        <div className="mx-auto w-4/5 text-center mt-20 text-xl">
          <div className="mx-auto w-min mb-20 animate-bounce">
            <Meh
              size={48}
              color="gray"
              strokeWidth={1.75}
              className="animate-spin"
            />
          </div>
          <div className="md:w-3/5 mx-auto lg:w-2/5">
            {username} is yet to publish contributions to the books he or she
            has read
          </div>
        </div>
      </>
    );
};

export default UserBooks;
