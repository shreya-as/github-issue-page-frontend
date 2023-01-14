import React, { useEffect, useReducer } from "react";
import { TbCircleDot } from "react-icons/tb";
import axios from "axios";
import AppSearchBar from "../../components/AppSearchBar";
import { issuePageConstants } from "./constants";
import { initialState, issuePageReducer } from "./issuePageReducer";
import "./issue-page.css";
import Loader from "../../components/Loader";
const IssueListingPage = () => {
  //define state of issue listing page
  const [state, dispatch] = useReducer(issuePageReducer, initialState);
  const { issues, loadingIssue } = state;
  console.log(loadingIssue, "loadingIssue");
  // get issue data
  const handleGetIssue = async () => {
    dispatch({ type: issuePageConstants.GET_ISSUE_REQUEST });
    try {
      const response = await axios.get(
        "https://api.github.com/repos/facebook/react/issues"
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
    handleGetIssue();
  }, []);
  // color array for styling
  const labelColor = ["b60205", "9149d1"];
  return (
    <>
      {/* search bar */}
      <AppSearchBar />

      {loadingIssue ? (
        <Loader />
      ) : (
        <>
          <div className="issue__container">
            {/* search bar */}
            <div className="issue__header">
              <TbCircleDot className="issue__svg" />
              Issues
            </div>
            {issues?.map((issue) => {
              const { id, title, labels } = issue;
              console.log(labels, "labels");
              return (
                <div className="issue__details" key={id}>
                  <div className="title__container">
                    <TbCircleDot className="issue__svg" />
                    <h1 className="issue__title">{title}</h1>
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
                    <span className="issue__number">#123</span>
                    <span className="issue__author">
                      Opened by <a href="#">shreya</a>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default IssueListingPage;
