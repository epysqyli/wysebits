import axios from "axios";
import { FilePlus, Info } from "react-feather";
import TileEntry from "../../components/books/TileEntry";
import CardBcg from "../../components/books/CardBcg";
import Link from "next/dist/client/link";

export const getServerSideProps = async (context) => {
  const slug = context.query.slug.split("-");
  const id = slug[slug.length - 1];

  const book = await axios(`http://localhost:3001/api/books/${id}`);

  const entries = await axios(
    `http://localhost:3001/api/books/${id}/tile_entries`
  );

  const title = slug.slice(0, slug.length - 1).join(" ");
  const capTitle = title.slice(0, 1).toUpperCase() + title.slice(1);

  try {
    const userResp = await axios({
      method: "get",
      url: "http://localhost:3001/api/logged_in",
      headers: { cookie: context.req.headers.cookie },
    });

    const favBooks = await axios({
      method: "get",
      url: `http://localhost:3001/api/users/${userResp.data.user.id}/fav_books`,
      headers: { cookie: context.req.headers.cookie },
    });

    if (entries.data.length != 0) {
      return {
        props: {
          entries: entries.data[0],
          title: capTitle,
          book: book.data.data,
          favBooks: favBooks.data.books,
        },
      };
    } else {
      return {
        props: {
          entries: false,
          title: capTitle,
          book: book.data.data,
          favBooks: favBooks.data.books,
        },
      };
    }
  } catch (error) {
    if (entries.data.length != 0) {
      return {
        props: {
          entries: entries.data[0],
          title: capTitle,
          book: book.data.data,
          favBooks: [],
        },
      };
    } else {
      return {
        props: {
          entries: false,
          title: capTitle,
          book: book.data.data,
          favBooks: [],
        },
      };
    }
  }
};

const Book = ({ entries, title, book, userState, favBooks }) => {
  if (entries) {
    return (
      <div className="pb-20">
        <CardBcg
          bookData={book}
          userId={userState.user.id}
          favBooks={favBooks}
        />
        <div className="w-5/6 mx-auto mt-20">
          {entries.map((entry) => {
            return (
              <div className="my-10" key={entry.id}>
                <TileEntry data={entry} />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="pb-20">
        <CardBcg
          bookData={book}
          userId={userState.user.id}
          favBooks={favBooks}
        />
        <div className="w-4/5 mx-auto">
          <div className="flex justify-between items-center my-20 px-3">
            <Info
              size={36}
              strokeWidth={1.5}
              className="bg-gray-200 rounded-3xl"
            />
            <div className="w-4/5 mx-auto">
              It appears as though there are no insights for this book yet ...
            </div>
          </div>
          <Link href={`/users/book-tiles/create/${book.id}`}>
            <div className="border px-5 py-3 bg-gray-100 rounded-md shadow group transition-all cursor-pointer hover:shadow-md">
              Be the first and share your knowledge by adding your own insights
              for <b>{title}</b> now!
              <FilePlus
                className="mt-10 mb-2 mx-auto group-hover:scale-110 transition-all group-active:text-gray-400"
                size={36}
                strokeWidth={1}
              />
            </div>
          </Link>
        </div>
      </div>
    );
  }
};

export default Book;
