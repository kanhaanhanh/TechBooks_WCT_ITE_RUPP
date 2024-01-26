import { useContext, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../styles/Category-dropdown.css";
// import data from "../data/data.json";
import useBookContext, { BookContext } from "../context/bookContext";
function CategoriesDropdown() {
  const { setCategory } = useBookContext();
  const { books } = useContext(BookContext);
  const [toggle, setToggle] = useState(false);
  const categoryList = [];
  for (var i = 0; i < books.length; i++) {
    if(!categoryList.includes(books[i].category))
      categoryList.push(books[i].category);
  }
  let cateslice = [];
  if (toggle) {
    // process of list categories
    cateslice = categoryList.slice(0, categoryList.length);
  } else {
    cateslice = categoryList.slice(0, 5);
  }
  return (
    <div className="cateContainer">
      <Dropdown className="position-fixed custom-dropdown" autoClose="value">
        <Dropdown.Toggle
          variant="danger"
          id="dropdown-basic"
          className="button-size top-1 end-0 p-2"
        >
          Categories
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {cateslice.map((c) => (
            <Dropdown.Item key={c.id} onClick={() => setCategory(`${c}`)}>
              {c}
            </Dropdown.Item> // value of dropdown
          ))}
          <hr />
          <div
            style={{ cursor: "pointer", textAlign: "center" }}
            onClick={() => setToggle((pre) => !pre)}
          >
            {toggle ? <h6>Less...</h6> : <h6>More...</h6>}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default CategoriesDropdown;
