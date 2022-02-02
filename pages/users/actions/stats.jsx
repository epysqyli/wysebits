import axios from "axios";
import { getLoggedUser, getUserStats } from "../../../lib/serverSideMethods";

export const getServerSideProps = async (context) => {
  const loggedUser = await getLoggedUser(context);
  const stats = await getUserStats(loggedUser.data.user.id);

  return {
    props: { entries: stats.data.entries },
  };
};

const Stats = ({ entries }) => {
  return <div></div>;
};

export default Stats;
