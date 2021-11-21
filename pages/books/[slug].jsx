import axios from "axios";

export const getServerSideProps = async (context) => {
  const slug = context.query.slug;

  return {
    props: { slug },
  };
};

const Book = ({ slug }) => {
  return <div></div>;
};

export default Book;
