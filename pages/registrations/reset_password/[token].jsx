import Head from "next/head";
import axios from "axios";
import { CheckCircle, Key } from "react-feather";
import { useEffect, useState } from "react";
import Link from "next/dist/client/link";
import { isMatching } from "../../../lib/manageProfileMethods";

export const getServerSideProps = (context) => {
  return { props: { token: context.query.token } };
};

const ResetPassword = ({ token }) => {
  const [psws, setPsws] = useState({
    password: "",
    passwordConfirmation: "",
  });

  const [confirmed, setConfirmed] = useState(false);

  const handleChange = (e) => {
    setPsws({
      ...psws,
      [e.target.name]: e.target.value,
    });
  };

  const changePassword = async () => {
    return await axios({
      method: "put",
      url: `${process.env.BASE_URL}/password/reset`,
      data: {
        password: psws.password,
        token: token,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await changePassword();

      console.log(resp);
      if (resp.status === 200) setConfirmed(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isMatching(psws.password, psws.passwordConfirmation);
  }, [psws.passwordConfirmation]);

  if (confirmed === false)
    return (
      <>
        <Head>
          <title>Reset password - Wysebits</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <div className="py-10">
          <div className="flex justify-between items-center w-5/6 md:w-4/6 lg:w-3/6 mx-auto mt-5 pb-5 border-b-2 md:border-none">
            <Key size={36} className="text-gray-700" />
            <div className="text-3xl text-gray-800">Choose a new password</div>
          </div>

          <form
            className="mx-auto md:w-4/6 lg:w-3/6 xl:w-2/5 py-10 md:border md:shadow rounded"
            onSubmit={handleSubmit}
          >
            <div className="w-4/6 mx-auto my-10">
              <label htmlFor="password" className="pl-1 text-xl text-gray-800">
                New password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                minLength={8}
                className="block mt-4 w-full border-none focus:ring-blue-400 ring-0 focus:ring-2 rounded-lg shadow-sm focus:shadow-md"
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-4/6 mx-auto my-10">
              <label
                htmlFor="password-confirmation"
                className="pl-1 text-xl text-gray-800"
              >
                Password confirmation
              </label>
              <input
                type="password"
                name="passwordConfirmation"
                id="password-confirmation"
                minLength={8}
                className={`block mt-4 w-full border-none focus:ring-blue-400 ring-0 focus:ring-2 rounded-lg shadow-sm focus:shadow-md ${
                  isMatching(psws.password, psws.passwordConfirmation)
                    ? "bg-green-100"
                    : psws.passwordConfirmation !== ""
                    ? "bg-red-100"
                    : null
                }`}
                onChange={handleChange}
                required
              />
            </div>

            {isMatching(psws.password, psws.passwordConfirmation) ? (
              <button
                type="submit"
                className="block mx-auto w-4/6 bg-white my-10 rounded-lg px-5 py-3 text-gray-800 shadow-md hover:shadow-lg transition-shadow active:shadow-inner"
              >
                Confirm password change
              </button>
            ) : (
              <button
                type="submit"
                className="block mx-auto w-4/6 bg-gray-50 text-gray-500 my-10 rounded-lg px-5 py-3 shadow cursor-default"
                disabled
              >
                Confirm password change
              </button>
            )}
          </form>
        </div>
      </>
    );

  return (
    <>
      <Head>
        <title>Reset password - Wysebits</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="py-10">
        <div className="flex justify-between items-center w-5/6 md:w-4/6 lg:w-3/6 mx-auto mt-5 pb-5 border-b-2">
          <Key size={36} className="text-gray-700" />
          <div className="text-3xl text-gray-800">Choose a new password</div>
        </div>

        <div className="text-center font-light w-4/5 md:w-4/6 lg:w-1/2 xl:w-1/3 mx-auto mt-20 rounded-md bg-gradient-to-br from-white to-green-100 py-1 shadow-lg animate-show-up-slow">
          <CheckCircle
            size={36}
            strokeWidth={1.75}
            className="w-min mx-auto my-10"
          />
          <div className="text-2xl">Your password has been changed!</div>
          <Link href="/registrations/login">
            <div className="my-10 py-3 text-3xl cursor-pointer w-3/5 mx-auto shadow-md bg-white rounded-md hover:bg-gray-100 active:shadow-inner">
              Go to login
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
