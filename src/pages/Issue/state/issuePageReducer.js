import { issuePageConstants } from "./constants";
// initial state
const initialState = {
  loadingIssue: false,
  error: false,
  issues: [],
  currentPage: 0,
  totalPages: 300,
  postsPerPage: 30,
  query: "",
};
const issuePageReducer = (state, action) => {
  switch (action.type) {
    // get issues request
    case issuePageConstants.GET_ISSUE_REQUEST: {
      return { ...state, loadingIssue: true, error: false };
    }
    // get issue success
    case issuePageConstants.GET_ISSUE_SUCCESS: {
      return {
        ...state,
        loadingIssue: false,
        error: false,
        issues: action?.payload,
      };
    }
    // get issue fail
    case issuePageConstants.GET_ISSUE_FAIL: {
      return { ...state, loadingIssue: false, error: true };
    }
    // update current page
    case issuePageConstants.UPDATE_CURRENT_PAGE: {
      return { ...state, currentPage: action?.payload };
    }
    // update query
    case issuePageConstants.UPDATE_QUERY: {
      return { ...state, query: action?.payload };
    }
    default:
      return state;
  }
};
export { initialState, issuePageReducer };
