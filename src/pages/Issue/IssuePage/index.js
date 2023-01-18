import React, { useCallback, useEffect, useReducer } from "react";
import { TbCircleDot } from "react-icons/tb";
import axios from "axios";
import AppSearchBar from "../../../components/AppSearchBar";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import IssuePageListing from "./IssuePageListing";
import ErrorPage from "../../../components/ErrorPage";
import { initialState, issuePageReducer } from "../state/issuePageReducer";
import {
  getIssueFail,
  getIssuesRequest,
  getIssueSuccess,
  updateCurrentPage,
  updateQuery,
} from "../state/actions";
import "./issuePage.css";
const IssueListingPage = () => {
  //define state of issue listing page
  const [state, dispatch] = useReducer(issuePageReducer, initialState);
  const {
    issues,
    loadingIssue,
    totalPages,
    currentPage,
    error,
    query,
    postsPerPage,
  } = state;

  // get issue data
  const getIssues = async (currentPage) => {
    dispatch(getIssuesRequest()); //dispatch request action
    try {
      const { data } = await axios.get(
        `https://api.github.com/repos/facebook/react/issues?page=${
          currentPage + 1
        }`
      );
      dispatch(getIssueSuccess(data));
    } catch (error) {
      dispatch(getIssueFail());
    }
  };

  // provides a way to abort one or more DOM requests
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
  useEffect(() => {
    query !== "" ? getSearchedData(currentPage) : getIssues(currentPage); // call search data if query is not empty else call fetch issues
    return () => controller.abort(); // abort() method on the controller to cancel the request.
  }, [query, currentPage]);

  // handle change page
  const handleChangePage = useCallback(
    (newPage) => {
      dispatch(updateCurrentPage(newPage)); // dispatch action to update page
    },
    [dispatch]
  );

  // handle search
  const handleSearch = useCallback(
    (search) => {
      dispatch(updateQuery(search)); // dispatch action to update query
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
        count={Math.ceil(totalPages / postsPerPage)}
        handleChangePage={handleChangePage}
        currentPage={currentPage}
      />
    </>
  );
};

export default IssueListingPage;
