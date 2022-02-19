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

        <div className="mx-auto w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 mt-10">
          <div className="mx-auto my-6">
            <ManageBox
              text="Check your public page"
              href={`/creators/${userState.user.username}`}
            />
          </div>

          <div className="mx-auto my-6">
            <ManageBox
              text="Manage your favorite categories"
              href="/users/actions/manage-profile/manage-categories"
            />
          </div>

          <div className="mx-auto my-6">
            <ManageBox
              text="Remove or change profile picture"
              href="/users/actions/manage-profile/manage-avatar"
            />
          </div>

          <div className="mx-auto my-6">
            <ManageBox
              text="Update current password"
              href="/users/actions/manage-profile/update-password"
            />
          </div>

          <div className="mx-auto my-6">
            <ManageBox
              text="Update current username"
              href="/users/actions/manage-profile/update-username"
            />
          </div>

          <div className="mx-auto my-6">
            <ManageBox
              text="Update current email address"
              href="/users/actions/manage-profile/update-email"
            />
          </div>
        </div>
      </div>
    );
  }

  return <NoAccess />;
};

export default ManageProfile;
