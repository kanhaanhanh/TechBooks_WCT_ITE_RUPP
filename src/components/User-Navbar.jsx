// src/components/Navbar.jsx
import { Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/userAuthContext";
import "../styles/User-Navbar.css"; // You can keep your custom styles
import { Link } from "react-router-dom";
import Logo from "../assets/new-logo.png";

//import profile from "../assets/user.webp";
import { useState, useEffect } from "react";
import { useAuth } from "../firebase";
import SearchBar from "./SearchBar";
import useBookContext from "../context/bookContext";
import SettingDropdown from "./Setting-dropdown";
function AppUserNavbar() {
  const currentUser = useAuth();
  const { setCategory, setSearchBook } = useBookContext();
  const [photoURL, setPhotoURL] = useState(
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
  );
  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);
  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleToHomePage = () => {
    setSearchBook("all");
    setCategory("all");
  };
  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="navbar-light shadow-sm p-3 mb-5 rounded navbar"
    >
      <Navbar.Brand as={Link} to="/" onClick={handleToHomePage}>
        <img src={Logo} alt="Logo" className="logo ml-auto" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse
        id="navbarNav"
        className="navStyle"
        style={{ background: "inherit", width: "inherit" }}
      >
        {/* <ul className='navbar__items--right'> */}
        <Nav
          className="ms-auto"
          style={{ display: "flex", flexDirection: "row" }}
        >
          {window.location.pathname == "/Admin" ? (
            <></>
          ) : (
            <li className="nav-item search">
              <SearchBar />
            </li>
          )}

          <li className="nav-item btn-pro-set">
            <Button as={Link} to="/" variant="primary" onClick={handleLogout}>
              Log out
            </Button>
          </li>
          <li className="nav-item btn-pro-set">
            <Link to={"/Account-setting"} className="profile">
              <img src={photoURL} alt="User profile" />
            </Link>
          </li>
          {window.location.pathname == "/Admin" ? (
            <></>
          ) : (
            <li className="nav-item btn-pro-set">
              <SettingDropdown check={"user"} />
            </li>
          )}
        </Nav>
        {/* </ul> */}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppUserNavbar;
