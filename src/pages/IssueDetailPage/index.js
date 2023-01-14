import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { issueDetailsConstants } from "./constants";
import {
  initialIssueDetailsState,
  issueDetailsReducer,
} from "./issueDetailsReducer";

const IssueDetailPage = () => {
  const [state, dispatch] = useReducer(
    issueDetailsReducer,
    initialIssueDetailsState
  );
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
  return <>IssueDetailPage</>;
};

export default IssueDetailPage;
