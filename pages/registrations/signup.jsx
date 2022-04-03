import Head from "next/head";
import { Mail } from "react-feather";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  isEmailAvailable,
  isMatching,
  isUsernameAvailable,
} from "../../lib/manageProfileMethods";

import axios from "axios";

const SignUp = () => {
  const router = useRouter();

  const [emailSent, setEmailSent] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [file, setFile] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    emailAddress: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const createFormData = () => {
    const formData = new FormData();

    formData.append("user[username]", userData.username);
    formData.append("user[email_address]", userData.emailAddress);
    formData.append("user[password]", userData.password);
    if (file) formData.append("user[avatar]", file);

    return formData;
  };

  const signUp = async (e) => {
    e.preventDefault();
    const formData = createFormData();

    const resp = await axios({
      method: "POST",
      url: `${process.env.BASE_URL}/signup`,
      data: formData,
    });

    console.log(resp);
    if (resp.status === 200) setEmailSent(true);
  };

  useEffect(() => {
    isMatching(userData.password, userData.passwordConfirmation);
  }, [userData.passwordConfirmation]);

  useEffect(async () => {
    if (userData.username.length > 3) {
      const resp = await isUsernameAvailable(userData.username);
      setUsernameAvailable(resp.data);
    } else {
      setUsernameAvailable(false);
    }
  }, [userData.username]);

  useEffect(async () => {
    if (userData.emailAddress.length > 5) {
      const resp = await isEmailAvailable(userData.emailAddress);
      setEmailAvailable(resp.data);
    } else {
      setEmailAvailable(false);
    }
  }, [userData.emailAddress]);

  if (emailSent === false)
    return (
      <>
        <Head>
          <title>Signup to Wysebits</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <div className="h-60 bg-signup-top bg-cover bg-center relative">
          <div className="bg-gray-900 h-full bg-opacity-80">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white  text-center text-3xl leading-10">
              Start learning.
              <br /> Start sharing.
            </div>
          </div>
        </div>

        <form className="mx-auto md:w-4/6 lg:w-3/6 py-10" onSubmit={signUp}>
          <div className="w-4/6 mx-auto my-4">
            <label htmlFor="username" className="pl-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              minLength={4}
              className={`block mt-2 w-full border-none focus:ring-blue-400 ring-0 focus:ring-2 rounded-lg shadow-sm focus:shadow-md ${
                usernameAvailable
                  ? "bg-green-100"
                  : userData.username !== "" && userData.username.length > 3
                  ? "bg-red-100"
                  : null
              }`}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-4/6 mx-auto my-4">
            <label htmlFor="email" className="pl-1">
              Email
            </label>
            <input
              type="email"
              name="emailAddress"
              id="email"
              minLength={8}
              className={`block mt-2 w-full border-none focus:ring-blue-400 ring-0 focus:ring-2 rounded-lg shadow-sm focus:shadow-md ${
                emailAvailable
                  ? "bg-green-100"
                  : userData.emailAddress !== "" &&
                    userData.emailAddress.length > 5
                  ? "bg-red-100"
                  : null
              }`}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-4/6 mx-auto my-4">
            <label
              htmlFor="name"
              className="pl-1 flex items-center justify-between"
            >
              <p>Password</p>
              <p className="text-gray-700 text-sm mt-1 w-4/5 md:w-3/5 mr-0 text-right">
                At least 8 characters, one uppercase letter, one digit
              </p>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              minLength={8}
              className="block mt-2 w-full border-none focus:ring-blue-400 ring-0 focus:ring-2 rounded-lg shadow-sm focus:shadow-md"
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-4/6 mx-auto my-4">
            <label htmlFor="name" className="pl-1">
              Password Confirmation
            </label>
            <input
              type="password"
              name="passwordConfirmation"
              id="password_confirmation"
              className={`block mt-2 w-full border-none focus:ring-blue-400 ring-0 focus:ring-2 rounded-lg shadow-sm focus:shadow-md ${
                isMatching(userData.password, userData.passwordConfirmation)
                  ? "bg-green-100"
                  : userData.passwordConfirmation !== ""
                  ? "bg-red-100"
                  : null
              }`}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-4/6 mx-auto my-4">
            <label htmlFor="user-avatar">Upload an avatar picture</label>
            <input
              type="file"
              name="user-avatar"
              id="user-avatar"
              onChange={(e) => setFile(e.target.files[0])}
              className="bg-white py-2 w-full px-3 mt-5 rounded-md shadow-sm"
            />
          </div>

          {isMatching(userData.password, userData.passwordConfirmation) &&
          usernameAvailable &&
          emailAvailable ? (
            <button
              type="submit"
              className="block mx-auto w-1/2 bg-white my-10 rounded-lg px-5 py-3 text-gray-800 shadow-md hover:shadow-lg transition-shadow active:shadow-inner"
            >
              Let's go
            </button>
          ) : (
            <button
              type="submit"
              className="block mx-auto w-1/2 bg-gray-50 text-gray-500 my-10 rounded-lg px-5 py-3 shadow cursor-default"
              disabled
            >
              Let's go
            </button>
          )}
        </form>
      </>
    );

  return (
    <>
      <Head>
        <title>Signup to Wysebits</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="h-60 bg-signup-top bg-cover bg-center relative">
        <div className="bg-gray-900 h-full bg-opacity-80">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white  text-center text-3xl leading-10">
            Start learning.
            <br /> Start sharing.
          </div>
        </div>
      </div>

      <div className="mt-20 w-5/6 md:w-1/2 lg:w-1/3 xl:w-1/4 p-10 mx-auto rounded-md shadow-md bg-white animate-show-up-slow mb-10">
        <Mail
          className="w-min mx-auto mb-10 text-gray-700"
          size={60}
          strokeWidth={1.5}
        />
        <div className="text-center md:text-left text-lg text-gray-800">
          We have sent you an email to{" "}
          <span className="font-medium tracking-tighter">
            {userData.emailAddress}
          </span>{" "}
          with a link to confirm your account on Wysebits!
        </div>
      </div>
    </>
  );
};

export default SignUp;
