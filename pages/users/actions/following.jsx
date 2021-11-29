import WelcomeTop from "../../../components/users/WelcomeTop";
import axios from "axios";

export const getServerSideProps = async (context) => {
  const userResp = await axios({
    method: "get",
    url: "http://localhost:3001/api/logged_in",
    headers: { cookie: context.req.headers.cookie },
  });

  const resp = await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${userResp.data.user.id}/following`,
    headers: { cookie: context.req.headers.cookie },
  });

  return {
    props: {
      following: resp.data,
    },
  };
};

const Following = ({ following }) => {
  return (
    <div>
      <WelcomeTop text="Users you are following" bcgImg="bg-following" />
    </div>
  );
};

export default Following;
