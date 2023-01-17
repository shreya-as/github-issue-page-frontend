import { issueDetailsConstants } from "./constants";

const initialIssueDetailsState = {
  loadingIssueDetails: false,
  error: false,
  issueDetails: [],
};
const issueDetailsReducer = (state, action) => {
  switch (action.type) {
    case issueDetailsConstants.GET_ISSUE_DETAILS_REQUEST: {
      return { ...state, loadingIssueDetails: true, error: false };
    }
    case issueDetailsConstants.GET_ISSUE_DETAILS_SUCCESS: {
      return {
        ...state,
        loadingIssueDetails: false,
        error: false,
        issueDetails: action?.payload,
      };
    }
    case issueDetailsConstants.GET_ISSUE_DETAILS_FAIL: {
      return { ...state, loadingIssueDetails: false, error: true };
    }
    default:
      return state;
  }
};
export { initialIssueDetailsState, issueDetailsReducer };
