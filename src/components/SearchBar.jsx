import { useState } from "react";
import {FormControl } from "react-bootstrap";
import search from "../assets/search-button.png";

import useBookContext from "../context/bookContext";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { setSearchBook } = useBookContext();
  const handleSearch = (e) => {
    e.preventDefault();
    var searchValueToLowerCase = searchValue.toLowerCase();
    
    setSearchBook(searchValueToLowerCase);
    setSearchValue("");
  };

  return (
    <>
      <form className="input-group" onSubmit={(e) => handleSearch(e)}>
        <FormControl
          type="text"
          className="form-control search-bar"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon1"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <span
          className="input-group-text"
          id="basic-addon1"
          onClick={(e) => handleSearch(e)}
        >
          <img src={search} alt="Search Button" className="serch-bar"/>
        </span>
      </form>
    </>
  );
};

export default SearchBar;