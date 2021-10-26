import "tailwindcss/tailwind.css";
import "../styles/globals.scss";
import axios from "axios";
import Layout from "../layouts/layout";
import { useState } from "react";

const MyApp = ({ Component, pageProps }) => {
  const [userState, setUserState] = useState({
    isLogged: false,
    user: {},
  });

  const handleLogin = (data) => {
    setUserState({
      isLogged: true,
      user: data.user,
    });
  };

  const handleLogout = () => {
    setUserState({
      isLogged: false,
      user: {},
    });
  };

  const checkLoginUrl = "http://localhost:3001/api/logged_in";
  const loginStatus = () => {
    axios
      .get(checkLoginUrl, { withCredentials: true })
      .then((resp) => {
        if (resp.data.logged_in) {
          handleLogin(resp.data);
        } else {
          handleLogout();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Layout>
      <Component
        {...pageProps}
        userState={userState}
        loginStatus={loginStatus}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
    </Layout>
  );
};

export default MyApp;
