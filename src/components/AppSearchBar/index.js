import React from "react";

const AppSearchBar = () => {
  return (
    <>
      <form>
        <div className="search__container">
          <input type="text" placeholder="Search issues..." />
          <FiSearch className="search" />
        </div>
      </form>
    </>
  );
};

export default AppSearchBar;
