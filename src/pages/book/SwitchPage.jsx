//Switchpage.jsx
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
// import { BsCaretDownFill } from "react-icons/bs";

function SwitchPage() {
  const navigate = useNavigate();


  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="link"
        style={{
          cursor: "pointer",
          color: "#87ceeb",
          background: "transparent",
          border: "none",
        }}
        className="Setting top-1 end-0 p-2"
      >
        Book Request Option
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>
          <Link to="/Request-Books/page2">Request book by Author's Name</Link>
        </Dropdown.Item>
        <hr/>
        <Dropdown.Item>
          <Link to="/Request-Books/page1">Request book by Link</Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SwitchPage;
