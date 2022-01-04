import { getUser, getBookTiles } from "../../../../lib/serverSideMethods";
import Link from "next/dist/client/link";
import BookCard from "../../../../components/books/BookCard";
import { slug } from "../../../../lib/utils";
import PageNavButton from "../../../../components/navigation/PageNavButton";

export const getServerSideProps = async (context) => {
  const username = context.params.username;
  const pageNum = context.params.page;

  const user = await getUser(username);
  const bookTiles = await getBookTiles(user, pageNum);
  const pagy = bookTiles.data.pagy;
  const books = bookTiles.data.tiles.map((tile) => tile.book);

  return {
    props: { books, pagy, username },
  };
};

const UserBooks = ({ books, pagy, username }) => {
  const clientUrl = `/creators/${username}/books`;

  return (
    <div>
      <div className="mt-10 w-11/12 grid gap-y-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:gap-x-10 2xl:grid-cols-4 mx-auto">
        {books.map((book) => {
          return (
            <Link href={`/books/${slug(book.title, book.id)}/1`} key={book.id}>
              <div className="rounded-md shadow-md bg-gray-100 hover:bg-gray-200 animate-show-up cursor-pointer active:shadow-inner">
                <BookCard bookData={book} />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-around my-16 md:w-4/5 mx-auto">
        <div className="w-1/3">
          <PageNavButton
            btnText="Previous page"
            url={pagy.prev_url}
            clientUrl={clientUrl}
          />
        </div>
        <div className="w-1/3">
          <PageNavButton
            btnText="Next page"
            url={pagy.next_url}
            clientUrl={clientUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default UserBooks;
