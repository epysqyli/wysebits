import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/dist/client/link";

const LogIn = ({ handleLogin }) => {
  const [userData, setUserData] = useState({
    emailAddress: null,
    password: null,
  });

  const router = useRouter();
  const logInUrl = "http://localhost:3001/api/login";

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
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
    <div>
      <div className="h-60 bg-login-top bg-cover bg-center relative">
        <div className="bg-gray-900 h-full bg-opacity-80">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-white w-screen text-center text-2xl">
            Keep the knowledge journey going
          </div>
        </div>
      </div>

      <div className="mx-auto md:w-4/6 lg:w-3/6 py-10">
        <form onSubmit={logIn}>
          <div className="w-4/6 mx-auto my-4">
            <label htmlFor="email" className="pl-1">
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
            <label htmlFor="name" className="pl-1">
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

        <div className="text-center mx-auto py-4 underline cursor-pointer">
          <Link href="/registrations/forgot_password">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
