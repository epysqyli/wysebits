import "tailwindcss/tailwind.css";
import "../styles/globals.scss";
import axios from "axios";
import Layout from "../layouts/layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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

  const loginStatus = () => {
    axios
      .get("http://localhost:3001/api/logged_in", { withCredentials: true })
      .then((resp) => {
        console.log(resp);
        if (resp.data.logged_in) {
          handleLogin(resp.data);
        } else {
          handleLogout();
        }
      })
      .catch((error) => console.log(error));
  };

  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      loginStatus();
    });
    return () => {
      router.events.off("routeChangeComplete", () => {
        console.log("stopped");
      });
    };
  }, [router.events]);

  return (
    <Layout userState={userState}>
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
