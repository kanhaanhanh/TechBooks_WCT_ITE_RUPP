import "../styles/Sidebar.css";
import { MdSpaceDashboard, MdPersonOutline } from "react-icons/md";
import { RiMessage3Fill,RiContactsBookUploadFill } from "react-icons/ri";
import { FaBookAtlas } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/Admin" style={{ textDecoration: "none" }}>
            <li>
              <MdSpaceDashboard className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/UserDOAD" style={{ textDecoration: "none" }}>
            <li>
              <MdPersonOutline className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/BookDOAD" style={{ textDecoration: "none" }}>
            <li>
              <FaBookAtlas className="icon" />
              <span>Books</span>
            </li>
          </Link>
          <Link to="/MessageDOAD" style={{ textDecoration: "none" }}>
            <li>
              <RiMessage3Fill className="icon" />
              <span>Messages</span>
            </li>
          </Link>
          <Link to="/RequestBookDOAD" style={{ textDecoration: "none" }}>
            <li>
              <RiContactsBookUploadFill className="icon" />
              <span>Request Book</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
