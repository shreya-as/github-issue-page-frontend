import { issuePageConstants } from "./constants";

const initialState = {
  loading: false,
  error: false,
  issues: [],
};
const issuePageReducer = (state, action) => {
  switch (action.type) {
    case issuePageConstants.GET_ISSUE_REQUEST: {
      return {
        loading: true,
        error: false,
      };
    }
    case issuePageConstants.GET_ISSUE_SUCCESS: {
      return {
        loading: false,
        error: false,
        issues: action.payload.data,
      };
    }
    case issuePageConstants.GET_ISSUE_FAIL: {
      return {
        loading: false,
        error: true,
      };
    }
    default:
      return state;
  }
};
export { initialState, issuePageReducer };
