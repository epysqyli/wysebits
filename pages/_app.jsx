import "tailwindcss/tailwind.css";
import "../styles/globals.scss";
import Layout from "../layouts/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
