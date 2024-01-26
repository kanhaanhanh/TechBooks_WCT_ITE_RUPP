import NavGuest from "../components/Navbar";
import NavAdmin from "../components/AdminNavbar";
import { useContext } from "react";
import { userAuthContext } from "../context/userAuthContext";
import Sidebar from "../components/Sidebar";
import "../styles/AdminLayout.css"
const AdminLayout = ({ children }) => {
  const { user } = useContext(userAuthContext);
  const Nav = user != null ? NavAdmin : NavGuest;
  return (
    <>
      <Nav />
      <div className="AdminDashboardhome">
        <Sidebar />
        <div className="AdminDashboardhomeContainer">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
