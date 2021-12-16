import axios from "axios";
import BasicInfo from "../../components/creators/BasicInfo";

export const getServerSideProps = async ({ params }) => {
  const username = params.username;

  const user = await axios.get(`http://localhost:3001/api/users/${username}`);

  return {
    props: { user: user.data },
  };
};

const Username = ({ user }) => {
  return (
    <div>
      <BasicInfo />
    </div>
  );
};

export default Username;
