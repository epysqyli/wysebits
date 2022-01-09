import axios from "axios";
import Link from "next/link";
import BookCard from "../../../../components/books/BookCard";
import WelcomeTop from "../../../../components/users/WelcomeTop";
import NoAccess from "../../../../components/users/NoAccess";
import NoItem from "../../../../components/users/NoItem";
import SearchInput from "../../../../components/navigation/SearchInput";
import PageNavButton from "../../../../components/navigation/PageNavButton";
import { getLoggedUser, getWipTiles } from "../../../../lib/serverSideMethods";

export const getServerSideProps = async (context) => {
  try {
    const pageNum = context.query.page;

    const loggedUser = await getLoggedUser(context);
    const tempTiles = await getWipTiles(loggedUser, context, pageNum);

    return {
      props: {
        books: tempTiles.data.tiles,
        pagy: tempTiles.data.pagy,
      },
    };
  } catch (error) {
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

  if (userState.isLogged && books.length == 0)
    return (
      <div>
        <WelcomeTop
          text="Contributions you are working on"
          bcgImg="bg-wip-contributions"
        />
        <div className="mx-auto w-4/5 md:w-4/6 lg:w-3/6 xl:w-2/6 2xl:w-1/3 py-20 lg:py-40 2xl:py-48">
          <NoItem message="You have no contributions you are working on at the moment" />
          <div className="border px-5 pt-5 mt-20 lg:mt-32 bg-gray-100 rounded-md shadow group transition-all cursor-pointer hover:shadow-md">
            <div>
              You can save individual contributions for a book without having to
              publish it immediately on the create page.
              <br />
              <br />{" "}
              <div className="text-center mt-5">Start exploring books now!</div>
            </div>
            <div className="mt-5">
              <SearchInput
                pageDest="/users/book-search/"
                placeholder="Any book in mind?"
              />
            </div>
          </div>
        </div>
      </div>
    );

  if (userState.isLogged && books.length !== 0)
    return (
      <div>
        <WelcomeTop
          text="Contributions you are working on"
          bcgImg="bg-wip-contributions"
        />
        <div className="mt-10 lg:mt-20 mx-auto w-11/12 lg:w-4/5 xl:w-4/5 2xl:w-4/6 grid md:grid-cols-2 xl:grid-cols-3 gap-y-12 md:gap-x-6 xl:gap-x-10">
          {books.map((item) => {
            return (
              <Link
                href={`/users/book-tiles/create/${item.book.id}`}
                key={item.book.id}
              >
                <div className="rounded-md shadow-md border bg-gray-100 hover:bg-gray-200 animate-show-up cursor-pointer active:shadow-inner">
                  <BookCard bookData={item.book} />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex justify-around my-16 lg:my-32 md:w-4/5 lg:w-1/2 mx-auto">
          <div className="w-1/3">
            <PageNavButton
              btnText="Previous page"
              clientUrl={clientUrl}
              url={pagy.prev_url}
            />
          </div>
          <div className="w-1/3">
            <PageNavButton
              btnText="Next page"
              clientUrl={clientUrl}
              url={pagy.next_url}
            />
          </div>
        </div>
      </div>
    );

  return <NoAccess />;
};

export default WorkInProgress;
