import { issueDetailsConstants } from "./constants";

// initial state
const initialIssueDetailsState = {
  loadingIssueDetails: false,
  detailError: false,
  issueDetails: [],
  comments: [],
};
const issueDetailsReducer = (state, action) => {
  switch (action.type) {
    //get issue details
    case issueDetailsConstants.GET_ISSUE_DETAILS_REQUEST: {
      return { ...state, loadingIssueDetails: true, detailError: false };
    }
    // get issue details success
    case issueDetailsConstants.GET_ISSUE_DETAILS_SUCCESS: {
      return {
        ...state,
        loadingIssueDetails: false,
        detailError: false,
        issueDetails: action?.payload?.issueDetails,
        comments: action?.payload?.comments,
      };
    }
    // get issue details fail
    case issueDetailsConstants.GET_ISSUE_DETAILS_FAIL: {
      return { ...state, loadingIssueDetails: false, detailError: true };
    }
    // return state
    default:
      return state;
  }
};
export { initialIssueDetailsState, issueDetailsReducer };
