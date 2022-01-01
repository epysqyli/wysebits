import axios from "axios";
import Link from "next/link";
import BookCard from "../../../../components/books/BookCard";
import WelcomeTop from "../../../../components/users/WelcomeTop";
import NoAccess from "../../../../components/users/NoAccess";
import NoItem from "../../../../components/users/NoItem";
import SearchInput from "../../../../components/navigation/SearchInput";
import PageNavButton from "../../../../components/navigation/PageNavButton";

export const getServerSideProps = async (context) => {
  try {
    const userResp = await axios({
      method: "get",
      url: "http://localhost:3001/api/logged_in",
      headers: { cookie: context.req.headers.cookie },
    });

    const pageNum = context.query.page;

    const tempTiles = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/temp_book_tiles?page=${pageNum}`,
      headers: { cookie: context.req.headers.cookie },
    });

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

  if (userState.isLogged) {
    if (books.length == 0) {
      return (
        <div>
          <WelcomeTop
            text="Contributions you are working on"
            bcgImg="bg-wip-contributions"
          />
          <div className="w-4/5 mx-auto">
            <NoItem message="You have no contributions you are working on at the moment" />
            <div className="border px-5 pt-3 mb-10 bg-gray-100 rounded-md shadow group transition-all cursor-pointer hover:shadow-md">
              <div>
                You can save individual contributions for a book without having
                to publish it immediately on the create page.
                <br />
                <br />{" "}
                <div className="text-center mt-5">
                  Start exploring books now!
                </div>
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
    } else {
      return (
        <div>
          <WelcomeTop
            text="Contributions you are working on"
            bcgImg="bg-wip-contributions"
          />
          <div className="mt-10 w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
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

          <div className="flex items-center my-16 w-4/5 mx-auto gap-x-4">
            <div className="w-1/2">
              <PageNavButton
                btnText="Previous page"
                clientUrl={clientUrl}
                url={pagy.prev_url}
              />
            </div>
            <div className="w-1/2">
              <PageNavButton
                btnText="Next page"
                clientUrl={clientUrl}
                url={pagy.next_url}
              />
            </div>
          </div>
        </div>
      );
    }
  } else {
    return <NoAccess />;
  }
};

export default WorkInProgress;
