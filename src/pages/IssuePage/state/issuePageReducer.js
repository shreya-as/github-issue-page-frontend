import { issuePageConstants } from "./constants";

const initialState = {
  loadingIssue: false,
  error: false,
  issues: [],
  currentPage: 0,
  totalPages: 100,
};
const issuePageReducer = (state, action) => {
  switch (action.type) {
    // get issues
    case issuePageConstants.GET_ISSUE_REQUEST: {
      return { ...state, loadingIssue: true, error: false };
    }
    case issuePageConstants.GET_ISSUE_SUCCESS: {
      return {
        ...state,
        loadingIssue: false,
        error: false,
        issues: action?.payload?.data,
      };
    }
    case issuePageConstants.GET_ISSUE_FAIL: {
      return { ...state, loadingIssue: false, error: true };
    }
    // update current page
    case issuePageConstants.UPDATE_CURRENT_PAGE: {
      return { ...state, currentPage: action?.payload };
    }
    default:
      return state;
  }
};
export { initialState, issuePageReducer };
