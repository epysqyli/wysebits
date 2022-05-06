import Link from "next/link";
import BookCard from "../../../../components/books/BookCard";
import WelcomeTop from "../../../../components/users/WelcomeTop";
import NoAccess from "../../../../components/users/NoAccess";
import Pagination from "../../../../components/navigation/Pagination";
import { getLoggedUser, getWipTiles } from "../../../../lib/serverSideMethods";
import ExploreMore from "../../../../components/navigation/ExploreMore";
import { isLogged } from "../../../../lib/auth";

export const getServerSideProps = async (context) => {
  if (isLogged(context)) {
    const pageNum = context.query.page;

    const loggedUser = await getLoggedUser(context);
    const tempTiles = await getWipTiles(loggedUser, context, pageNum);

    return {
      props: {
        books: tempTiles.data.tiles,
        pagy: tempTiles.data.pagy,
      },
    };
  } else {
    return {
      props: {
        books: null,
        error: error.message,
      },
    };
  }
};

const WorkInProgress = ({ books, pagy, userState }) => {
  const clientUrl = "/users/actions/favorite-books";

  if (userState.isLogged && books.length === 0)
    return (
      <div className="pt-10 lg:pt-16">
        <WelcomeTop
          text="Contributions you are working on"
          bcgImg="bg-wip-contributions"
        />
        <ExploreMore
          message="You have no contributions you are working on at the moment"
          body="You can save individual contributions for a book without having to publish it immediately on the create page."
          exortation="Start exploring books now!"
        />
      </div>
    );

  if (userState.isLogged && books.length !== 0)
    return (
      <div className="pt-10 lg:pt-16">
        <WelcomeTop
          text="Contributions you are working on"
          bcgImg="bg-wip-contributions"
        />
        <div className="py-16 w-11/12 lg:w-4/5 xl:w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
          {books.map((item) => {
            return (
              <Link
                href={`/users/book-tiles/create/${item.book.id}`}
                key={item.book.id}
              >
                <div className="rounded-md bg-white shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all cursor-pointer active:shadow-inner border-b-2 border-blue-200 hover:border-blue-300">
                  <BookCard bookData={item.book} />
                </div>
              </Link>
            );
          })}
        </div>

        <Pagination clientUrl={clientUrl} pagy={pagy} />
      </div>
    );

  return <NoAccess />;
};

export default WorkInProgress;
