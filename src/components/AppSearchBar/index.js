import React, { memo } from "react";
import { FaSearch } from "react-icons/fa";
import "./search.css";
const AppSearchBar = ({ handleSearch }) => {
  // set the user input value
  const handleChange = ({ target: { value } }) => {
    handleSearch(value);
  };
  return (
    <>
      <div className="search__container">
        <input
          type="text"
          placeholder="Search issues..."
          onChange={handleChange}
        />
        <FaSearch className="search__icon" />
      </div>
    </>
  );
};

export default memo(AppSearchBar);
