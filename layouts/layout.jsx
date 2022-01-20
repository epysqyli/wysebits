import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Layout = ({ children, userState, userLoading }) => {
  return (
    <>
      <Header userState={userState} userLoading={userLoading} />
      <main className="animate-show-up">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
