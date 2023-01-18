import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { issueDetailsConstants } from "../state/constants";
import {
  initialIssueDetailsState,
  issueDetailsReducer,
} from "../state/issueDetailsReducer";
import "./issueDetail.css";
import Comment from "./Comment";
import {
  getIssueDetailsFail,
  getIssueDetailsRequest,
  getIssueDetailSuccess,
} from "../state/actions";
import Loader from "../../../components/Loader";
import ErrorPage from "../../../components/ErrorPage";

const IssueDetailPage = () => {
  //define state of issue detail page
  const [state, dispatch] = useReducer(
    issueDetailsReducer,
    initialIssueDetailsState
  );
  const { issueDetails, loadingIssueDetails, comments, detailError } = state;
  // use the `useParams` hook here to access the dynamic pieces of the URL.
  const { id } = useParams();

  // get issue data
  const handleGetIssueDetails = async () => {
    dispatch(getIssueDetailsRequest());
    try {
      const { data } = await axios.get(
        `https://api.github.com/repos/facebook/react/issues/${id}`
      );
      // fetch comments
      const { data: comments } = await axios.get(data?.comments_url);
      dispatch(
        getIssueDetailSuccess({ issueDetails: data, comments: comments })
      );
    } catch (error) {
      dispatch(getIssueDetailsFail());
    }
  };

  //get issue details
  useEffect(() => {
    handleGetIssueDetails();
  }, []);
  return (
    <>
      {/* issue detail container */}
      {loadingIssueDetails ? (
        <Loader />
      ) : detailError ? (
        <ErrorPage />
      ) : (
        <div className="detail__container">
          <div className="detail__title--container">
            <span className="detail__title">{issueDetails?.title}</span>
            <span className="detail__issue--number">
              #{issueDetails?.number}
            </span>
          </div>
          {/* comment section */}
          <Comment issueDetails={issueDetails} />
          {/* sub comments */}
          {comments?.map((comment) => (
            <Comment issueDetails={comment} key={comment?.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default IssueDetailPage;
