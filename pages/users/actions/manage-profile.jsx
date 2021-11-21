import WelcomeTop from "../../../components/users/WelcomeTop";

export const getServerSideProps = async (context) => {
  return {
    props: {},
  };
};

const ManageProfile = () => {
  return <div>
    <WelcomeTop firstLine="Manage your profile" />
  </div>
}

export default ManageProfile;