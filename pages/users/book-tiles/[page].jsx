import axios from "axios";
import BookCardSlider from "../../../components/books/BookCardSlider";
import WelcomeTop from "../../../components/users/WelcomeTop";
import NoAccess from "../../../components/users/NoAccess";
import NoItem from "../../../components/users/NoItem";
import SearchInput from "../../../components/navigation/SearchInput";
import PageNavButton from "../../../components/navigation/PageNavButton";

export const getServerSideProps = async (context) => {
  try {
    const resp = await axios({
      method: "get",
      url: "http://localhost:3001/api/logged_in",
      headers: { cookie: context.req.headers.cookie },
    });

    const pageNum = context.query.page;

    const bookTiles = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${resp.data.user.id}/book_tiles?page=${pageNum}`,
    });

    return {
      props: {
        bookTiles: bookTiles.data.tiles.filter((book_tile) => book_tile.tile_entries.length != 0),
        pagy: bookTiles.data.pagy,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

const UserBookTiles = ({ bookTiles, pagy, userState }) => {
  const clientUrl = "/users/book-tiles";

  if (userState.isLogged) {
    if (bookTiles.length == 0) {
      return (
        <div>
          <WelcomeTop
            text="Books for which you have shared insights"
            bcgImg="bg-check-book-tiles"
          />
          <div className="w-4/5 mx-auto">
            <NoItem message="You have no contributions yet" />
            <div className="border px-5 py-3 bg-gray-100 rounded-md shadow group transition-all cursor-pointer hover:shadow-md">
              <div>
                Start contributing now by choosing the first book for which you
                want to add your own personal insights
              </div>
              <div className="mt-10 mb-3">
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
            text="Books for which you have shared insights"
            bcgImg="bg-check-book-tiles"
          />
          <div className="mt-10 w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 mx-auto">
            {bookTiles.map((bookTile) => {
              return (
                <div key={bookTile.book.id}>
                  <BookCardSlider
                    bookData={bookTile.book}
                    tileEntries={bookTile.tile_entries}
                    bookTileId={bookTile.id}
                  />
                </div>
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

export default UserBookTiles;
