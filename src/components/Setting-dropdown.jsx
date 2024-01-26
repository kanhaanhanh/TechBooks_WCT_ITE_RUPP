import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import "../styles/Category-dropdown.css";
import Setting from "../assets/Setting_icon.png";
function SettingDropdown({check}) {
  const dropItem = {
    user:[
        { id: 1, name: "About Us",path:"/About-Us"  },
        { id: 2, name: "My Drive",path:"/My-Drive"  },
        { id: 3, name: "Request Books",path:"/Request-Books/page2" },
        { id: 4, name: "Account Settings",path:"/Account-Setting"  },
      ],
    book:[
        { id: 1, name: "New Free Book",path:"/createFreeBook"  },
        { id: 2, name: "New Purchase Book",path:"/createNotFreeBook" },
      ]
  };
  return (
    <Dropdown>
      <Dropdown.Toggle
        // id="dropdown-basic"
        variant="link"
        style={{ cursor: "pointer", color:check=="user"? "#87ceeb" : "#fff"}}
        className="Setting top-1 end-0 p-2"
      >
        <img src={Setting} alt="Setting" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {check == "user"? dropItem.user.map((i)=>(
         <Dropdown.Item key={i.id}>
         <Link to={i.path}>{i.name}</Link>
       </Dropdown.Item>   
        )):
        dropItem.book.map((i)=>(
            <Dropdown.Item key={i.id}>
            <Link to={i.path}>{i.name}</Link>
          </Dropdown.Item>   
           ))
    }
        <hr />
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SettingDropdown;
