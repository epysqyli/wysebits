import WelcomeTop from "../../../components/users/WelcomeTop";

export const getServerSideProps = () => {
  return {
    props: {},
  };
};

const FavoriteTileEntries = () => {
  return <div>
    <WelcomeTop firstLine="Your favorite insights" />
  </div>;
};

export default FavoriteTileEntries;
