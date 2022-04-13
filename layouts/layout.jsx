import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Layout = ({ children, userState, userLoading }) => {
  return (
    <div className="relative flex flex-col flex-grow">
      <Header userState={userState} userLoading={userLoading} />
      <main className="animate-show-up">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
