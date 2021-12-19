import Head from "next/head";
import HomepageButton from "../../../components/users/HomepageButton";
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
          <div className="bg-gray-800 bg-opacity-70 text-white text-2xl font-bold text-center py-12">
            <div>Welcome back, {userState.user.username}.</div>
            <div className="mt-2">What are you up to today?</div>
          </div>
        </div>

        <div className="w-4/5 mx-auto mt-16">
          <div className="mx-auto my-12">
            <HomepageButton
              text="Share your knowledge"
              bcgImg="bg-create-tile"
              href="/users/book-search/"
            />
          </div>

          <div className="mx-auto my-12">
            <HomepageButton
              text="Manage your contributions"
              bcgImg="bg-check-book-tiles"
              href="/users/book-tiles/1"
            />
          </div>

          <div className="mx-auto my-12">
            <HomepageButton
              text="Favorite books"
              bcgImg="bg-liked-books"
              href="/users/actions/favorite-books/1"
            />
          </div>

          <div className="mx-auto my-12">
            <HomepageButton
              text="Saved book insights"
              href="/users/actions/favorite-insights/1"
              bcgImg="bg-saved-tiles"
            />
          </div>

          <div className="mx-auto my-12">
            <HomepageButton
              text="Users you are following"
              href="/users/actions/following/1"
              bcgImg="bg-following"
            />
          </div>

          <div className="mx-auto my-12">
            <HomepageButton
              text="Your followers"
              href="/users/actions/followers/1"
              bcgImg="bg-followers"
            />
          </div>

          <div className="mx-auto my-12">
            <HomepageButton
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
