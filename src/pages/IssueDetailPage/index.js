import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { issueDetailsConstants } from "./constants";
import {
  initialIssueDetailsState,
  issueDetailsReducer,
} from "./issueDetailsReducer";
import "./issueDetail.css";
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
      <div className="detail__container">
        <div className="title__container">
          <span className="detail__title">{issueDetails?.title}</span>
          <span className="issue__number">#{issueDetails?.number}</span>
        </div>
        {/* comment section */}
        <div className="comment__container">
          <div className="avatar">
            <img
              src={issueDetails?.user?.avatar_url}
              loading="lazy"
              alt="image"
            ></img>
          </div>
          <div className="comment">
            <div className="comment__header"></div>
            <div className="comment__section"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IssueDetailPage;
