import axios from "axios";
import { Key } from "react-feather";
import { useEffect, useState } from "react";

export const getServerSideProps = (context) => {
  return { props: { token: context.query.token } };
};

const ResetPassword = ({ token }) => {
  const [psws, setPsws] = useState({
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (e) => {
    setPsws({
      ...psws,
      [e.target.name]: e.target.value,
    });
  };

  const isMatching = () => {
    if (psws.password !== "" && psws.password === psws.passwordConfirmation) {
      return true;
    }

    return false;
  };

  const changePassword = async () => {
    return await axios({
      method: "put",
      url: "http://localhost:3001/api/password/reset",
      data: {
        password: psws.password,
        token: token,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await changePassword();

    console.log(resp);
  };

  useEffect(() => isMatching(), [psws.passwordConfirmation]);

  return (
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
            className={`block mt-4 w-full border-none focus:ring-blue-400 ring-0 focus:ring-2 rounded-lg shadow-sm focus:shadow-md ${
              isMatching()
                ? "bg-green-100"
                : psws.passwordConfirmation !== ""
                ? "bg-red-100"
                : null
            }`}
            onChange={handleChange}
            required
          />
        </div>

        {isMatching() ? (
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
  );
};

export default ResetPassword;
