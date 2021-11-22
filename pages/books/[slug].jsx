import axios from "axios";
import TileEntry from "../../components/books/TileEntry";

export const getServerSideProps = async (context) => {
  const slug = context.query.slug.split("-");
  const id = slug[slug.length - 1];

  const entries = await axios(
    `http://localhost:3001/api/books/${id}/tile_entries`
  );

  const title = slug.slice(0, slug.length - 1).join(" ");
  const capTitle = title.slice(0, 1).toUpperCase() + title.slice(1);

  return {
    props: { entries: entries.data[0], title: capTitle },
  };
};

const Book = ({ entries, title }) => {
  return (
    <div className="w-4/5 mx-auto">
      <div className="text-center mt-10 text-2xl font-bold">{title}</div>
      {entries.map((entry) => {
        return (
          <div className="my-10">
            <TileEntry key={entry.id} data={entry} />
          </div>
        );
      })}
    </div>
  );
};

export default Book;
