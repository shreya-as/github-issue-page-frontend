import React, { useEffect, useReducer } from "react";
import { TbCircleDot } from "react-icons/tb";
import axios from "axios";
import AppSearchBar from "../../components/AppSearchBar";
import { issuePageConstants } from "./constants";
import { initialState, issuePageReducer } from "./issuePageReducer";
import "./issue-page.css";
const IssueListingPage = () => {
  //define state of issue listing page
  const [state, dispatch] = useReducer(issuePageReducer, initialState);
  console.log(state, "state");
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
  useEffect(() => {
    handleGetIssue();
  }, []);
  return (
    <>
      {/* search bar */}
      <AppSearchBar />
      <div className="issue__container">
        {/* search bar */}
        <div className="issue__header">
          <TbCircleDot className="issue__svg" />
          901 open
        </div>
        <div className="issue__details">
          <div className="title__container">
            <TbCircleDot className="issue__svg" />
            <h1 className="issue__title">
              Feat(renderToPipeableStream): Allow passing crossorigin attribute
              on bootstrapScripts
            </h1>
            <span className="issue__status">Open</span>
          </div>
          <div className="issue__data">
            <span className="issue__number">#123</span>
            <span className="issue__author">
              Opened by <a href="#">shreya</a>
            </span>
          </div>
        </div>
        <div className="issue__details">
          <div className="title__container">
            <TbCircleDot className="issue__svg" />
            <h1 className="issue__title">
              Feat(renderToPipeableStream): Allow passing crossorigin attribute
              on bootstrapScripts
            </h1>
            <span className="issue__status">Open</span>
          </div>
          <div className="issue__data">
            <span className="issue__number">#123</span>
            <span className="issue__author">
              Opened by <a href="#">shreya</a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default IssueListingPage;
