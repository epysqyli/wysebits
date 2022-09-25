import "tailwindcss/tailwind.css";
import "../styles/globals.scss";
import axios from "axios";
import Layout from "../layouts/layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { OverlayProvider } from "../hooks/OverlayContext";
import FullScreenLoader from "../components/navigation/FullScreenLoader";

const MyApp = ({ Component, pageProps }) => {
  const [userLoading, setUserLoading] = useState(true);
  const [userState, setUserState] = useState({
    isLogged: false,
    user: {}
  });

  const handleLogin = (data) => {
    setUserState({
      isLogged: true,
      user: data.user
    });
  };

  const handleLogout = () => {
    setUserState({
      isLogged: false,
      user: {}
    });
  };

  const loginStatus = async () => {
    try {
      const resp = await axios({
        method: "GET",
        url: `${process.env.BASE_URL}/logged_in`,
        withCredentials: true
      });
      if (resp.data.logged_in) {
        handleLogin(resp.data);
        setUserLoading(false);
      } else {
        handleLogout();
        window.location = "/";
      }
    } catch (error) {
      handleLogout();
    }
  };

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [activeOverlay, setActiveOverlay] = useState(false);
  const [secondaryLayer, setSecondaryLayer] = useState(false);

  const showOverlay = () => {
    if (activeOverlay) setSecondaryLayer(true);
    setActiveOverlay(true);
  };

  const hideOverlay = () => {
    setActiveOverlay(false);
    setSecondaryLayer(false);
  };

  const overlayStyle = "h-full w-full bg-slate-500 opacity-90 fixed top-0 z-10";

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoading(true);
      loginStatus();
    });

    router.events.on("routeChangeComplete", () => {
      hideOverlay();
      setLoading(false);
    });

    return () => router.events.off("routeChangeComplete", () => {});
  }, [router.events]);

  // necessary on page refresh without route change
  useEffect(() => {
    loginStatus();
  }, []);

  return (
    <OverlayProvider value={{ showOverlay, hideOverlay, secondaryLayer: secondaryLayer }}>
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
        {activeOverlay ? <div className={overlayStyle}></div> : null}
      </Layout>
    </OverlayProvider>
  );
};

export default MyApp;
