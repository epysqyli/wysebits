import axios from "axios";
import WelcomeTop from "../../../components/users/WelcomeTop";

export const getServerSideProps = async (context) => {
  const userResp = await axios({
    method: "get",
    url: "http://localhost:3001/api/logged_in",
    headers: { cookie: context.req.headers.cookie },
  });

  const resp = await axios({
    method: "get",
    url: `http://localhost:3001/api/users/${userResp.data.user.id}/followers`,
    headers: { cookie: context.req.headers.cookie },
  });

  return {
    props: {
      followers: resp.data,
    },
  };
};

const Followers = ({ followers }) => {
  return (
    <div>
      <WelcomeTop text="Your followers" bcgImg="bg-followers" />
    </div>
  );
};

export default Followers;
