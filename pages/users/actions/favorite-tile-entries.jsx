import WelcomeTop from "../../../components/users/WelcomeTop";
import NoAccess from "../../../components/users/NoAccess";

export const getServerSideProps = () => {
  return {
    props: {},
  };
};

const FavoriteTileEntries = ({ userState }) => {
  if (userState.isLogged) {
    return (
      <div>
        <WelcomeTop firstLine="Your favorite insights" />
      </div>
    );
  } else {
    return <NoAccess />;
  }
};

export default FavoriteTileEntries;
