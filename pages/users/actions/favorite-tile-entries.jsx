import WelcomeTop from "../../../components/users/WelcomeTop";
import NoAccess from "../../../components/users/NoAccess";
import NoItem from "../../../components/users/NoItem";

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
        <NoItem itemType="favorite insights" />
      </div>
    );
  } else {
    return <NoAccess />;
  }
};

export default FavoriteTileEntries;
