import { issuePageConstants } from "./constants";

const initialState = {
  loadingIssue: false,
  error: false,
  issues: [],
  currentPage: 0,
  totalPages: 300,
  query: "",
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
        issues: action?.payload,
      };
    }
    case issuePageConstants.GET_ISSUE_FAIL: {
      return { ...state, loadingIssue: false, error: true };
    }
    // update current page
    case issuePageConstants.UPDATE_CURRENT_PAGE: {
      return { ...state, currentPage: action?.payload };
    }
    // update query
    case issuePageConstants.UPDATE_QUERY: {
      console.log(action, "test");
      return { ...state, query: action?.payload };
    }
    default:
      return state;
  }
};
export { initialState, issuePageReducer };
