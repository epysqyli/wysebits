import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children, userState }) => {
  return (
    <>
      <Header userState={userState} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
