import React, { useCallback, useEffect, useReducer, useState } from "react";
import { TbCircleDot } from "react-icons/tb";
import axios from "axios";
import AppSearchBar from "../../components/AppSearchBar";
import { issuePageConstants } from "./state/constants";
import { initialState, issuePageReducer } from "./state/issuePageReducer";
import Loader from "../../components/Loader";
import "./issuePage.css";
import Pagination from "../../components/Pagination";
import IssuePageListing from "./IssuePageListing";
import ErrorPage from "../../components/ErrorPage";
import {
  getIssueFail,
  getIssuesRequest,
  getIssueSuccess,
} from "./state/actions";
const IssueListingPage = () => {
  //define state of issue listing page
  const [state, dispatch] = useReducer(issuePageReducer, initialState);
  const { issues, loadingIssue, totalPages, currentPage, error, query } = state;

  // get issue data
  const getIssues = async (currentPage) => {
    dispatch(getIssuesRequest());
    try {
      const { data } = await axios.get(
        `https://api.github.com/repos/facebook/react/issues?page=${
          currentPage + 1
        }`
      );
      dispatch(getIssueSuccess(data));
    } catch (error) {
      console.log(error, "error");
      dispatch(getIssueFail());
    }
  };
  const controller = new AbortController();

  // get searched data
  const getSearchedData = async (currentPage) => {
    dispatch(getIssuesRequest());
    try {
      const { data } = await axios.get(
        `https://api.github.com/search/issues?repo=facebook/react&q=${query}&page=${
          currentPage + 1
        }`,
        {
          signal: controller?.signal,
        }
      );
      dispatch(getIssueSuccess(data?.items));
    } catch (error) {
      // if request is cancelled do not set error to true
      error?.code === "ERR_CANCELED"
        ? dispatch(getIssuesRequest())
        : dispatch(getIssueFail());
    }
  };
  // call search data if query is not empty else call fetch issues
  useEffect(() => {
    // call function to get list of issues
    query !== "" ? getSearchedData(currentPage) : getIssues(currentPage);
    return () => controller.abort();
  }, [query, currentPage]);
  // handle change page
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

  // handle search
  const handleSearch = useCallback(
    (search) => {
      dispatch({ type: issuePageConstants.UPDATE_QUERY, payload: search });
    },
    [dispatch]
  );
  return (
    <>
      {/* search bar */}
      <AppSearchBar handleSearch={handleSearch} />
      <div className="issue__container">
        <div className="issue__header">
          <TbCircleDot className="issue__svg" />
          Issues
        </div>

        {/* display loader if loadingIssue is true else display issues data  and display error page if error is set to true*/}
        {loadingIssue ? (
          <Loader />
        ) : error ? (
          <ErrorPage />
        ) : (
          <IssuePageListing issues={issues} />
        )}
      </div>
      {/* pagination */}
      <Pagination
        count={Math.ceil(totalPages / 30)}
        handleChangePage={handleChangePage}
        currentPage={currentPage}
      />
    </>
  );
};

export default IssueListingPage;
