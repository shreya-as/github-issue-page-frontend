import React from "react";
import "./header.css";
import SubHeader from "./SubHeader";
const Header = () => {
  return (
    <>
      <nav className="header">
        <a className="logo">Git Hub</a>
        <ul className="menu">
          <li>Pull requests</li>
          <li>Issues</li>
        </ul>
      </nav>
      <SubHeader />
    </>
  );
};

export default Header;
