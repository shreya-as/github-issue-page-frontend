import React, { memo, useState } from "react";
import "./pagination.css";

const Pagination = ({ count, handleChangePage, currentPage }) => {
  // handle previous
  const handlePrev = () => {
    if (currentPage > 0) {
      handleChangePage(currentPage - 1);
    }
  };
  // handle next
  const handleNext = () => {
    if (currentPage < count - 1) {
      handleChangePage(currentPage + 1);
    }
  };
  return (
    // pagination
    <div className="pagination">
      <button
        className="prev"
        onClick={handlePrev}
        disabled={currentPage === 0}
      >
        Previous
      </button>
      <ul className="page__container">
        {[...Array(count)].map((_, page) => {
          return (
            <button
              className="page"
              id={currentPage === page ? "active" : ""}
              key={page}
              // disabled={currentPage === page}
              onClick={() => handleChangePage(page)}
            >
              {page + 1}
            </button>
          );
        })}
      </ul>
      <button
        className="next"
        onClick={handleNext}
        disabled={currentPage === count - 1}
      >
        Next
      </button>
    </div>
  );
};

export default memo(Pagination);
