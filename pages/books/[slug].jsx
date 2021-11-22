import axios from "axios";
import TileEntry from "../../components/books/TileEntry";

export const getServerSideProps = async (context) => {
  const slug = context.query.slug.split("-");
  const id = slug[slug.length - 1];

  const entries = await axios(
    `http://localhost:3001/api/books/${id}/tile_entries`
  );

  return {
    props: { entries: entries.data[0] },
  };
};

const Book = ({ entries }) => {
  return (
    <div className="w-4/5 mx-auto">
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
