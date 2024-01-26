import NavGuest from "../components/Navbar";
import NavUser from "../components/User-Navbar";
import Footer from "../components/Footer";
import Category from "../components/Categories-dropdown";
import { useContext } from "react";
import { userAuthContext } from "../context/userAuthContext";

const AppLayout = ({ children,}) => {
  const {user} = useContext(userAuthContext)
  const Nav = user!=null? NavUser : NavGuest;
  return (
    <>
      <Nav />
      <Category />
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center" >
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
