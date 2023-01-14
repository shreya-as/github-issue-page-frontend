import React from "react";
import { FaSearch } from "react-icons/fa";
const AppSearchBar = () => {
  return (
    <>
      <form>
        <div className="search__container">
          <input type="text" placeholder="Search issues..." />
          <FaSearch className="search" />
        </div>
      </form>
    </>
  );
};

export default AppSearchBar;
