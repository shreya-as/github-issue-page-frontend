import { issuePageConstants } from "./constants";

const initialState = {
  loadingIssue: false,
  error: false,
  issues: [],
};
const issuePageReducer = (state, action) => {
  switch (action.type) {
    case issuePageConstants.GET_ISSUE_REQUEST: {
      return {
        loadingIssue: true,
        error: false,
      };
    }
    case issuePageConstants.GET_ISSUE_SUCCESS: {
      return {
        loadingIssue: false,
        error: false,
        issues: action.payload.data,
      };
    }
    case issuePageConstants.GET_ISSUE_FAIL: {
      return {
        loadingIssue: false,
        error: true,
      };
    }
    default:
      return state;
  }
};
export { initialState, issuePageReducer };
