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
const IssueListingPage = () => {
  //define state of issue listing page
  const [state, dispatch] = useReducer(issuePageReducer, initialState);
  const { issues, loadingIssue, totalPages, currentPage } = state;
  console.log(currentPage, "currentPage");
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
      console.log("error", error);
      dispatch({ type: issuePageConstants.GET_ISSUE_FAIL });
    }
  };
  // run effect
  useEffect(() => {
    // call function to get list of issues
    fetchIssues(currentPage);
  }, [currentPage]);
  // color for array for styling
  const labelColor = ["b60205", "9149d1"];

  // calculate time
  const getIssueCreatedTime = (date) => {
    // Create a new Date object from the input date
    const updatedDate = new Date(date);
    console.log(date, "date");
    // Get the current date
    const currentDate = new Date();

    // Calculate the elapsed time in milliseconds
    const elapsedTime = currentDate - updatedDate;

    // Calculate the number of hours, days, weeks, and months that have passed
    const elapsedMinutes = Math.floor(elapsedTime / (1000 * 60));
    const elapsedHours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const elapsedDays = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    const elapsedWeeks = Math.floor(elapsedTime / (1000 * 60 * 60 * 24 * 7));
    const elapsedMonths = Math.floor(elapsedTime / (1000 * 60 * 60 * 24 * 30));
    console.log(elapsedWeeks, "elapsedWeeks");
    return elapsedTime < 0
      ? `now.`
      : elapsedMinutes < 60
      ? `${elapsedMinutes} minute${elapsedMinutes === 1 ? "" : "s"}ago`
      : elapsedHours < 24
      ? `${elapsedHours} hour${elapsedHours === 1 ? "" : "s"} ago`
      : elapsedDays < 7
      ? elapsedDays === 1
        ? "yesterday"
        : `${elapsedDays} days ago`
      : elapsedWeeks < 4
      ? elapsedWeeks === 1
        ? "last week"
        : ` ${elapsedWeeks} weeks ago`
      : elapsedMonths === 1
      ? "last month"
      : `on ${updatedDate.toLocaleDateString()}`;
  };

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
        ) : (
          <>
            {issues?.map((issue) => {
              const {
                id,
                title,
                labels,
                number,
                created_at,
                comments,
                user: { login },
              } = issue;
              return (
                <div className="issue__details" key={id}>
                  <TbCircleDot className="issue__svg" />
                  <div>
                    <div className="title__container">
                      {/* navigate to issues detail page */}
                      <Link to={`issues/${number}`}>
                        <h1 className="issue__title">{title}</h1>
                      </Link>
                      {/* display labels */}
                      {labels?.map((label) => {
                        return (
                          <span
                            key={label?.id}
                            className="issue__status"
                            style={{
                              backgroundColor: `#${label?.color}`,
                              color: `${
                                labelColor?.includes(label?.color)
                                  ? "white"
                                  : "black"
                              }`,
                            }}
                          >
                            {label?.name}
                          </span>
                        );
                      })}
                    </div>

                    <div className="issue__data">
                      <span className="issue__number">{`#${number}`}</span>
                      <span className="issue__author">
                        opened {getIssueCreatedTime(created_at)} by {login}
                      </span>
                    </div>
                    <div className="issue__comment">
                      <span>Comments: {comments}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
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
