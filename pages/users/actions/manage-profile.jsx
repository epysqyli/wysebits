import WelcomeTop from "../../../components/users/WelcomeTop";
import NoAccess from "../../../components/users/NoAccess";

export const getServerSideProps = async (context) => {
  return {
    props: {},
  };
};

const ManageProfile = ({ userState }) => {
  if (userState.isLogged) {
    return (
      <div>
        <WelcomeTop firstLine="Manage your profile" />
      </div>
    );
  } else {
    return <NoAccess />;
  }
};

export default ManageProfile;
