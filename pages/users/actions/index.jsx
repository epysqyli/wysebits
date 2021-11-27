import Head from "next/head";
import HomepageButton from "../../../components/users/HomepageButton";
import WelcomeTop from "../../../components/users/WelcomeTop";
import NoAccess from "../../../components/users/NoAccess";

const Actions = ({ userState }) => {
  if (userState.isLogged) {
    return (
      <div>
        <Head>
          <title>User Homepage</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <WelcomeTop
          firstLine={`Welcome back, ${userState.user.username}.`}
          secondLine="What are you up to today?"
        />

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
              href="/users/book-tiles/"
            />
          </div>

          <div className="mx-auto my-12">
            <HomepageButton
              text="Favorite books"
              bcgImg="bg-liked-books"
              href="/users/actions/favorite-books"
            />
          </div>

          <div className="mx-auto my-12">
            <HomepageButton
              text="Saved book insights"
              href="/users/actions/favorite-tile-entries"
              bcgImg="bg-saved-tiles"
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
