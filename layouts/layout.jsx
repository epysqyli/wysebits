import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Layout = ({ children, userState }) => {
  return (
    <>
      <Header userState={userState} />
      <main className="animate-show-up pb-10">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
