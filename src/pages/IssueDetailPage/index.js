import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { issueDetailsConstants } from "./constants";
import {
  initialIssueDetailsState,
  issueDetailsReducer,
} from "./issueDetailsReducer";
import "./issueDetail.css";
import ReactMarkdown from "react-markdown";

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
        <div className="comment__container">
          <div className="avatar">
            <img src={issueDetails?.user?.avatar_url} alt="Avatar" />
          </div>
          <div className="comment__section">
            <div className="comment__header">
              <strong>{issueDetails?.user?.login}</strong>
              <span>{issueDetails?.user?.login}</span>
            </div>
            {/* <div
              className="comment__body"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(issueDetails?.body ?? ""),
              }}
            ></div> */}
            <div className="comment__body">
              <ReactMarkdown>
                {issueDetails?.body?.replace(/<!--[\s\S]*?-->/g, "")}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IssueDetailPage;
