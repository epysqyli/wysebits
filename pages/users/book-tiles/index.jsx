import axios from "axios";
import BookCardSlider from "../../../components/books/BookCardSlider";
import WelcomeTop from "../../../components/users/WelcomeTop";
import NoAccess from "../../../components/users/NoAccess";
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
  } else {
    return <NoAccess />;
  }
};

export default UserBookTiles;
