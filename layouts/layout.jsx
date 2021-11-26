import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

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
