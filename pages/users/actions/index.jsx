import Head from "next/head";
import UserAction from "../../../components/users/UserAction";
import NoAccess from "../../../components/users/NoAccess";

const Actions = ({ userState }) => {
  if (userState.isLogged) {
    return (
      <div>
        <Head>
          <title>User Homepage</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="bg-user-welcome bg-cover bg-center shadow-lg">
          <div className="bg-gray-800 bg-opacity-70 text-white text-2xl font-bold text-center py-12 lg:py-16">
            <div>Welcome back, {userState.user.username}.</div>
            <div className="mt-2">What are you up to today?</div>
          </div>
        </div>

        <div className="mx-auto w-4/5 lg:w-4/6 xl:w-5/6 2xl:w-2/3 py-16 lg:pt-18 lg:pb-28 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-1 md:gap-y-1 md:gap-x-1">
          <div>
            <UserAction
              text="Share your knowledge"
              bcgImg="bg-create-tile"
              href="/users/book-search/"
            />
          </div>

          <div>
            <UserAction
              text="Published contributions"
              bcgImg="bg-check-book-tiles"
              href="/users/book-tiles/1"
            />
          </div>

          <div>
            <UserAction
              text="Work in progress contributions"
              bcgImg="bg-wip-contributions"
              href="/users/book-tiles/wip/1"
            />
          </div>

          <div>
            <UserAction
              text="Favorite books"
              bcgImg="bg-liked-books"
              href="/users/actions/favorite-books/1"
            />
          </div>

          <div>
            <UserAction
              text="Saved book insights"
              href="/users/actions/favorite-insights/1"
              bcgImg="bg-saved-tiles"
            />
          </div>

          <div>
            <UserAction
              text="Users you are following"
              href="/users/actions/following/1"
              bcgImg="bg-following"
            />
          </div>

          <div>
            <UserAction
              text="Your followers"
              href="/users/actions/followers/1"
              bcgImg="bg-followers"
            />
          </div>

          <div>
            <UserAction
              text="Manage profile"
              href="/users/actions/manage-profile"
              bcgImg="bg-settings"
            />
          </div>
        </div>
      </div>
    );
  }

  return <NoAccess />;
};

export default Actions;
