import React, { memo } from "react";
import "./pagination.css";

const Pagination = ({ count, handleChangePage, currentPage }) => {
  // handle previous
  const handlePrev = () => {
    currentPage > 0 && handleChangePage(currentPage - 1);
  };
  // handle next
  const handleNext = () => {
    currentPage < count - 1 && handleChangePage(currentPage + 1);
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
      <div className="page__container">
        {/* {currentPage < count - 2 && count > 3 && (
          <span className="page">...</span>
        )} */}
        {[...Array(count)].map((_, page) => {
          return (
            <button
              className="page"
              id={currentPage === page ? "active" : ""}
              key={page}
              onClick={() => handleChangePage(page)}
            >
              {page + 1}
            </button>
          );
        })}
      </div>
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
