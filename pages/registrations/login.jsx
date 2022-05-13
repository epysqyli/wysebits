import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/dist/client/link";
import IconAndTitle from "../../components/layout/IconAndTitle";

const LogIn = ({ handleLogin }) => {
  const [userData, setUserData] = useState({
    emailAddress: null,
    password: null,
  });

  const router = useRouter();
  const logInUrl = `${process.env.BASE_URL}/login`;

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const logIn = (e) => {
    e.preventDefault();
    const { emailAddress, password } = userData;

    axios
      .post(
        logInUrl,
        { email_address: emailAddress, password: password },
        { withCredentials: true }
      )
      .then((resp) => {
        console.log(resp);
        handleLogin(resp.data);
        router.push("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="pt-10 lg:pt-16">
      <IconAndTitle title="Login to Wysebits"/>
      <div className="h-48 bg-login-top lg:w-4/5 2xl:w-2/3 lg:mt-5 lg:rounded-md border-b-2 border-white mx-auto relative rounded-md">
        <div className="bg-gray-900 h-full bg-opacity-80 lg:rounded-md">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-screen text-center text-3xl lg:text-4xl">
            Keep the knowledge journey going
          </div>
        </div>
      </div>

      <div className="md:w-4/6 lg:w-3/6 2xl:w-1/3 mx-auto mt-10">
        <form onSubmit={logIn}>
          <div className="w-4/6 mx-auto my-4">
            <label htmlFor="email" className="pl-1 text-gray-50">
              Email
            </label>
            <input
              type="email"
              name="emailAddress"
              id="email"
              className="block mt-2 w-full border-none focus:ring-0 rounded-lg shadow-sm focus:shadow-md"
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-4/6 mx-auto my-4">
            <label htmlFor="name" className="pl-1 text-gray-50">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="block mt-2 w-full border-none focus:ring-0 rounded-lg shadow-sm focus:shadow-md"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="block mx-auto w-3/6 border rounded-lg px-5 py-2 bg-white my-10 hover:shadow-md focus:bg-gray-200 focus:shadow-md"
          >
            Let's go!
          </button>
        </form>

        <div className="text-center mx-auto w-2/5 py-4 underline cursor-pointer text-gray-50">
          <Link href="/registrations/forgot_password">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
