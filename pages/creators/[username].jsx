import BasicInfo from "../../components/creators/BasicInfo";

export const getServerSideProps = ({ params }) => {
  const username = params.username;

  return {
    props: {},
  };
};

const Username = () => {
  return (
    <div>
      <BasicInfo />
    </div>
  );
};

export default Username;
