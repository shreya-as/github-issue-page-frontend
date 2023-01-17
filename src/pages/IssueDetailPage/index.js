import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { issueDetailsConstants } from "./state/constants";
import {
  initialIssueDetailsState,
  issueDetailsReducer,
} from "./state/issueDetailsReducer";
import "./issueDetail.css";
import Comment from "./Comment";

const IssueDetailPage = () => {
  const [state, dispatch] = useReducer(
    issueDetailsReducer,
    initialIssueDetailsState
  );
  const { issueDetails } = state;
  console.log(issueDetails, "issueDetails");
  // use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  // get issue data
  const handleGetIssueDetails = async () => {
    dispatch({ type: issueDetailsConstants.GET_ISSUE_DETAILS_REQUEST });
    try {
      const response = await axios.get(
        `https://api.github.com/repos/facebook/react/issues/${id}`
      );
      dispatch({
        type: issueDetailsConstants.GET_ISSUE_DETAILS_SUCCESS,
        payload: response,
      });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: issueDetailsConstants.GET_ISSUE_DETAILS_FAIL });
    }
  };
  useEffect(() => {
    handleGetIssueDetails();
  }, []);
  return (
    <>
      {/* 25874 */}
      {/* issue detail container */}
      <div className="detail__container">
        <div className="detail__title--container">
          <span className="detail__title">{issueDetails?.title}</span>
          <span className="detail__issue--number">#{issueDetails?.number}</span>
        </div>

        {/* comment section */}
        <Comment issueDetails={issueDetails} />
      </div>
    </>
  );
};

export default IssueDetailPage;
