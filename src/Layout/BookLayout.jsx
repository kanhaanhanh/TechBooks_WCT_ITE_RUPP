import NavGuest from "../components/Navbar";
import NavUser from "../components/User-Navbar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { userAuthContext } from "../context/userAuthContext";
const BookLayout = ({ children,}) => {
    const {user} = useContext(userAuthContext)
  const Nav = user!=null? NavUser : NavGuest;
  return (
    <>
    <Nav />
    <div className="container px-4 px-lg-5">
      <div className="row gx-4 gx-lg-5 justify-content-center mb-10">
        {children}
      </div>
    </div>
    <Footer />
  </>
  )
}

export default BookLayout