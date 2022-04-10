import "tailwindcss/tailwind.css";
import "../styles/globals.scss";
import axios from "axios";
import Layout from "../layouts/layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FullScreenLoader from "../components/navigation/FullScreenLoader";

const MyApp = ({ Component, pageProps }) => {
  const [userLoading, setUserLoading] = useState(true);

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

  const loginStatus = async () => {
    try {
      const resp = await axios({
        method: "GET",
        url: `${process.env.BASE_URL}/logged_in`,
        withCredentials: true,
      });
      if (resp.data.logged_in) {
        handleLogin(resp.data);
        setUserLoading(false);
      } else {
        handleLogout();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoading(true);
    });

    router.events.on("routeChangeComplete", () => {
      loginStatus();
      setLoading(false);
    });

    return () => router.events.off("routeChangeComplete", () => {});
  }, [router.events]);

  // necessary on page refresh without route change
  useEffect(() => loginStatus(), []);

  return (
    <Layout userState={userState} userLoading={userLoading}>
      {loading === true ? <FullScreenLoader /> : null}
      <Component
        {...pageProps}
        userState={userState}
        userLoading={userLoading}
        loginStatus={loginStatus}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
    </Layout>
  );
};

export default MyApp;
