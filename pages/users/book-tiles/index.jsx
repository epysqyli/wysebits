import axios from "axios";
import BookCardSlider from "../../../components/books/BookCardSlider";
import WelcomeTop from "../../../components/users/WelcomeTop";
import NoAccess from "../../../components/users/NoAccess";
import NoItem from "../../../components/users/NoItem";
import SearchInput from "../../../components/navigation/SearchInput";
import { useEffect } from "react";

export const getServerSideProps = async (context) => {
  try {
    const resp = await axios({
      method: "get",
      url: "http://localhost:3001/api/logged_in",
      headers: { cookie: context.req.headers.cookie },
    });

    const bookTiles = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${resp.data.user.id}/book_tiles`,
    });

    return {
      props: {
        bookTiles: bookTiles.data.tiles,
        allData: bookTiles.data,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

const UserBookTiles = ({ bookTiles, allData, userState }) => {
  useEffect(() => {
    console.log(allData);
  }, []);

  if (userState.isLogged) {
    if (bookTiles.length == 0) {
      return (
        <div>
          <WelcomeTop
            firstLine="Here are the books for which"
            secondLine="you have shared your insights"
          />
          <div className="w-4/5 mx-auto">
            <NoItem itemType="contributions" />
            <div className="border px-5 py-3 bg-gray-100 rounded-md shadow group transition-all cursor-pointer hover:shadow-md">
              <div>
                Start contributing now by choosing the first book for which you
                want to add your own personal insights
              </div>
              <SearchInput
                pageDest="/users/book-search/"
                placeholder="Any book in mind?"
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <WelcomeTop
            firstLine="Here are the books for which"
            secondLine="you have shared your insights"
          />
          <div className="w-4/5 mx-auto my-16">
            {bookTiles.map((bookTile) => {
              return (
                <div className="my-10" key={bookTile.book.id}>
                  <BookCardSlider
                    bookData={bookTile.book}
                    tileEntries={bookTile.tile_entries}
                    bookTileId={bookTile.id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  } else {
    return <NoAccess />;
  }
};

export default UserBookTiles;
