import React from "react";
import { Link } from "react-router-dom";

const SubHeader = () => {
  return (
    <div className="sub__header">
      <Link to="/">
        <span>Issue</span>
      </Link>
    </div>
  );
};

export default SubHeader;
