import React, { useCallback, useEffect, useReducer } from "react";
import { TbCircleDot } from "react-icons/tb";
import axios from "axios";
import AppSearchBar from "../../components/AppSearchBar";
import { issuePageConstants } from "./state/constants";
import { initialState, issuePageReducer } from "./state/issuePageReducer";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import "./issuePage.css";
import Pagination from "../../components/Pagination";
import IssuePageListing from "./IssuePageListing";
import ErrorPage from "../../components/ErrorPage";
// import { useSearch } from "../../AppUtils/CustomHooks/useSearch";
const IssueListingPage = () => {
  //define state of issue listing page
  const [state, dispatch] = useReducer(issuePageReducer, initialState);
  const { issues, loadingIssue, totalPages, currentPage, error } = state;
  // const [searchedData] = useSearch();
  // console.log(searchedData, "searchedData");
  const handleChangePage = useCallback(
    (newPage) => {
      // dispatch action to update page
      dispatch({
        type: issuePageConstants.UPDATE_CURRENT_PAGE,
        payload: newPage,
      });
    },
    [dispatch]
  );
  // const handleChangePage = (newPage) => {
  //   // dispatch action to update page
  //   dispatch({
  //     type: issuePageConstants.UPDATE_CURRENT_PAGE,
  //     payload: newPage,
  //   });
  // };
  // get issue data
  const fetchIssues = async (currentPage) => {
    dispatch({ type: issuePageConstants.GET_ISSUE_REQUEST });
    try {
      const response = await axios.get(
        `https://api.github.com/repos/facebook/react/issues?page=${
          currentPage + 1
        }`
      );
      dispatch({
        type: issuePageConstants.GET_ISSUE_SUCCESS,
        payload: response,
      });
    } catch (error) {
      console.log(error, "error");
      dispatch({ type: issuePageConstants.GET_ISSUE_FAIL });
    }
  };
  // run effect
  useEffect(() => {
    // call function to get list of issues
    fetchIssues(currentPage);
  }, [currentPage]);

  return (
    <>
      {/* search bar */}
      <AppSearchBar />

      <div className="issue__container">
        {/* search bar */}
        <div className="issue__header">
          <TbCircleDot className="issue__svg" />
          Issues
        </div>
        {/* display loader if loadingIssue is true else display issues data */}
        {loadingIssue ? (
          <Loader />
        ) : error ? (
          <ErrorPage></ErrorPage>
        ) : (
          <IssuePageListing issues={issues} />
        )}
      </div>
      <Pagination
        count={Math.ceil(totalPages / 30)}
        handleChangePage={handleChangePage}
        currentPage={currentPage}
      />
    </>
  );
};

export default IssueListingPage;
