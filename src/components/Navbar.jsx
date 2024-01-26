// src/components/Navbar.jsx
import { Navbar, Nav, Button } from "react-bootstrap";
import "../styles/Navbar.css"; // You can keep your custom styles
import { Link } from "react-router-dom";
import Logo from "../assets/new-logo.png";

import useBookContext from "../context/bookContext";
// import { useState } from "react";
import SearchBar from "./SearchBar";

const AppNavbar = () => {
  const { setCategory, setSearchBook } = useBookContext();
  // const [searchCategory, setSearchCategory] = useState("");

  const handleToHomePage=()=>{
    setSearchBook("all")
    setCategory("all")
  }

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
      <Navbar.Collapse id="navbarNav"style={{background:"inherit",width:"inherit"}} >
        {/* <ul className='navbar__items--right'> */}
        <Nav className="ms-auto back" style={{display:"flex",flexDirection:"row"}}>
          <li className="nav-item search">
            <SearchBar />
          </li>
          <li className="nav-item btn-pro-set">
            <Button as={Link} to="/login" variant="primary">
              Log In
            </Button>
          </li>
          <li className="nav-item btn-pro-set">
            <Button as={Link} to="/signup" variant="light">
              Sign Up
            </Button>
          </li>
        </Nav>
        {/* </ul> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;