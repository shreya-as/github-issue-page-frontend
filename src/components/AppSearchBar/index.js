import React from "react";
import { FaSearch } from "react-icons/fa";
import "./search.css";
const AppSearchBar = () => {
  return (
    <>
      <div className="search__container">
        <input type="text" placeholder="Search issues..." />
        <FaSearch className="search__icon" />
      </div>
    </>
  );
};

export default AppSearchBar;
