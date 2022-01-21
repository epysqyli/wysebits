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
          <div className="bg-gray-800 bg-opacity-70 text-white text-2xl font-bold text-center py-12 xl:py-6">
            <div>Welcome back, {userState.user.username}.</div>
            <div className="mt-2">What are you up to today?</div>
          </div>
        </div>

        <div className="w-4/5 xl:w-4/6 2xl:w-2/3 my-10 lg:my-20 grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 mx-auto">
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
  } else {
    return <NoAccess />;
  }
};

export default Actions;
