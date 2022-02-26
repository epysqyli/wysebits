import axios from "axios";
import { CheckCircle, Compass } from "react-feather";
import { useEffect, useState } from "react";
import Link from "next/dist/client/link";

export const getServerSideProps = (context) => {
  const token = context.query.token;

  return { props: { token } };
};

const ConfirmToken = ({ token, userState }) => {
  const [confirmed, setConfirmed] = useState(false);

  const sendConfirmation = async () => {
    try {
      const resp = await axios({
        method: "POST",
        url: `${process.env.BASE_URL}/users/confirm_email_update`,
        data: { token: token },
      });

      setConfirmed(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    return await axios({
      method: "get",
      url: `${process.env.BASE_URL}/logout`,
      withCredentials: true,
    });
  };

  useEffect(async () => {
    if (userState.isLogged) {
      const res = await logout();
      if (res.data.status === "success") location.reload();
    }
  });

  return (
    <div className="pb-52 md:pb-60 lg:pb-72 2xl:pb-80 bg-gradient-to-br from-blue-50 via-gray-100 to-gray-200">
      <div className="mx-auto w-11/12 md:w-4/6 lg:w-1/2 xl:w-2/5">
        <div className="flex justify-between items-center py-24 gap-x-10 border-b-2">
          <Compass
            size={50}
            strokeWidth={1.5}
            className="w-1/4 text-gray-600"
          />
          <div className="text-lg">Confirm your new email address</div>
        </div>

        {confirmed === false ? (
          <div
            className="text-center text-3xl font-light py-20 w-4/5 mx-auto mt-40 border-b-2 border-blue-500 rounded-md bg-white shadow-md cursor-pointer hover:bg-gray-50 active:bg-gray-200 transition-colors"
            onClick={sendConfirmation}
          >
            Confirm email
          </div>
        ) : (
          <div className="text-center font-light w-4/5 mx-auto mt-40 rounded-md bg-gradient-to-br from-white to-green-100 py-1 shadow-lg">
            <CheckCircle
              size={36}
              strokeWidth={1.75}
              className="w-min mx-auto my-10"
            />
            <div className="text-2xl">
              Your can now login with your new email address
            </div>
            <Link href="/registrations/login">
              <div className="my-10 py-3 text-3xl cursor-pointer w-3/5 mx-auto shadow-md bg-white rounded-md hover:bg-gray-100 active:shadow-inner">
                Go to login
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmToken;
