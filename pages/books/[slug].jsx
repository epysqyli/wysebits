import axios from "axios";
import { PlusSquare } from "react-feather";
import TileEntry from "../../components/books/TileEntry";

export const getServerSideProps = async (context) => {
  const slug = context.query.slug.split("-");
  const id = slug[slug.length - 1];

  const entries = await axios(
    `http://localhost:3001/api/books/${id}/tile_entries`
  );

  const title = slug.slice(0, slug.length - 1).join(" ");
  const capTitle = title.slice(0, 1).toUpperCase() + title.slice(1);

  if (entries.data.length != 0) {
    return {
      props: { entries: entries.data[0], title: capTitle },
    };
  } else {
    return {
      props: { entries: false, title: capTitle },
    };
  }
};

const Book = ({ entries, title }) => {
  if (entries) {
    return (
      <div className="w-4/5 mx-auto animate-show-up">
        <div className="text-center mt-10 text-2xl font-bold">{title}</div>
        {entries.map((entry) => {
          return (
            <div className="my-10" key={entry.id}>
              <TileEntry data={entry} />
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="w-4/5 mx-auto animate-show-up">
        <div className="text-center mt-10 text-2xl font-bold">{title}</div>
        <div className="text-center my-20 w-4/5 mx-auto">
          It appears as though there are no insights for this book yet ...
        </div>
        <div className="border px-5 py-3 rounded-md shadow-md group transition-all cursor-pointer hover:shadow-lg active:bg-gray-200">
          Be the first and share your knowledge by adding your own insights for{" "}
          <b>{title}</b> now!
          <PlusSquare
            className="mt-5 mx-auto group-hover:scale-110 transition-all group-active:text-white"
            size={36}
            strokeWidth={1}
          />
        </div>
      </div>
    );
  }
};

export default Book;
