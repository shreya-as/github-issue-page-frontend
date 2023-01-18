import React, { memo } from "react";
import { MdLastPage, MdFirstPage } from "react-icons/md";

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
  // handle last
  const handleLast = () => {
    currentPage < count - 1 && handleChangePage(count - 1);
  };
  // handle first
  const handleFirst = () => {
    currentPage > 0 && handleChangePage(0);
  };
  return (
    // pagination
    <div className="pagination">
      {/* first page button */}
      <button className="page" onClick={handleFirst}>
        <MdFirstPage />
      </button>

      {/* previous button */}
      <button
        className="prev"
        onClick={handlePrev}
        disabled={currentPage === 0}
      >
        {/* <GrFormPrevious /> */}
        Previous
      </button>

      {/* pages */}
      <div className="page__container">
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

      {/* next button */}
      <button
        className="next"
        onClick={handleNext}
        disabled={currentPage === count - 1}
      >
        Next
      </button>

      {/* last page button */}
      <button className="page" onClick={handleLast}>
        <MdLastPage />
      </button>
    </div>
  );
};

export default memo(Pagination);
