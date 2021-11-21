import axios from "axios";

export const getServerSideProps = async (context) => {
  const slug = context.query.slug.split("-");
  const id = slug[slug.length - 1];

  const entries = await axios(
    `http://localhost:3001/api/books/${id}/tile_entries`
  );

  return {
    props: { entries: entries.data },
  };
};

const Book = ({ entries }) => {
  return <div></div>;
};

export default Book;
