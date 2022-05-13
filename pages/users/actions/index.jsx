import IconAndTitle from "../../../components/layout/IconAndTitle";
import UserAction from "../../../components/users/UserAction";
import NoAccess from "../../../components/users/NoAccess";

const Actions = ({ userState }) => {
  if (userState.isLogged) {
    return (
      <div className="pt-10 lg:pt-16">
        <IconAndTitle title="Your dashboard"/>

        <div className="hidden md:block bg-user-welcome bg-cover bg-center lg:shadow-xl lg:w-4/5 2xl:w-2/3 lg:rounded-md mx-auto border-b-2 border-white">
          <div className="bg-gray-800 bg-opacity-70 text-white text-3xl font-medium text-center py-12 lg:py-16 lg:rounded-md">
            <div>Hi {userState.user.username}</div>
            <div className="mt-2">What are you up to today?</div>
          </div>
        </div>

        <div className="mx-auto w-4/5 lg:w-4/6 xl:w-5/6 2xl:w-3/4 py-4 md:py-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-2 md:gap-y-4 md:gap-x-2">
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
              href={{
                pathname: "/users/book-tiles",
                query: { page: 1 },
              }}
            />
          </div>

          <div>
            <UserAction
              text="Work in progress contributions"
              bcgImg="bg-wip-contributions"
              href={{
                pathname: "/users/book-tiles/wip",
                query: { page: 1 },
              }}
            />
          </div>

          <div>
            <UserAction
              text="Favorite books"
              bcgImg="bg-liked-books"
              href={{
                pathname: "/users/actions/favorite-books",
                query: { page: 1 },
              }}
            />
          </div>

          <div>
            <UserAction
              text="Saved book insights"
              bcgImg="bg-saved-tiles"
              href={{
                pathname: "/users/actions/favorite-insights",
                query: { page: 1 },
              }}
            />
          </div>

          <div>
            <UserAction
              text="Commented insights"
              bcgImg="bg-comments"
              href={{
                pathname: "/users/actions/commented-insights",
                query: { page: 1 },
              }}
            />
          </div>

          <div>
            <UserAction
              text="Users you are following"
              bcgImg="bg-following"
              href={{
                pathname: "/users/actions/following",
                query: { page: 1 },
              }}
            />
          </div>

          <div>
            <UserAction
              text="Your followers"
              bcgImg="bg-followers"
              href={{
                pathname: "/users/actions/followers",
                query: { page: 1 },
              }}
            />
          </div>

          <div>
            <UserAction
              text="Statistics"
              href="/users/actions/stats"
              bcgImg="bg-stats"
            />
          </div>

          <div>
            <UserAction
              text="Conversations"
              href="/users/actions/conversations"
              bcgImg="bg-conversations"
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
