import axios from "axios";

export const getServerSideProps = (context) => {
  const token = context.query.token;

  return { props: { token } };
};

const ConfirmToken = ({ token }) => {
  const sendConfirmation = async () => {
    // axios call to confirmation endpoint
  };

  return <div></div>;
};

export default ConfirmToken;
