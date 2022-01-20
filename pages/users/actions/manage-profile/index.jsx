import WelcomeTop from "../../../../components/users/WelcomeTop";
import NoAccess from "../../../../components/users/NoAccess";
import ManageBox from "../../../../components/users/manageBox";

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

const ManageProfile = ({ userState }) => {
  if (userState.isLogged) {
    return (
      <div>
        <WelcomeTop text="Manage your profile" bcgImg="bg-settings" />

        <div className="mx-auto w-4/6 md:w-1/2 lg:w-2/5 mt-10">
          <div className="mx-auto my-5">
            <ManageBox
              text="Check your public page"
              href={`/creators/${userState.user.username}`}
            />
          </div>

          <div className="mx-auto my-5">
            <ManageBox
              text="Manage your favorite categories"
              href="/users/actions/manage-profile/manage-categories"
            />
          </div>
        </div>
      </div>
    );
  }

  if (userState.isLogged === false) return <NoAccess />;
};

export default ManageProfile;
