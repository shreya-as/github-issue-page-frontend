import React from "react";
import "./pagination.css";

const Pagination = () => {
  return (
    // paginaiton
    <div className="pagination">
      <button className="prev">Previous</button>
      <ul className="page__container">
        <li className="page active">1</li>
        <li className="page">2</li>
        <li className="page">3</li>
      </ul>
      <button className="next">Next</button>
    </div>
  );
};

export default Pagination;
