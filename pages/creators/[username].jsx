export const getServerSideProps = ({ params }) => {
  const username = params.username;

  return {
    props: {},
  };
};

const Username = () => {
  return <div></div>;
};

export default Username;
