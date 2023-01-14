const initialState = {
  loading: false,
  error: false,
  issues: [],
};
const issuePageReducer = (tasks, action) => {
  switch (action.type) {
    case "GET_ISSUE_REQUEST": {
      return {
        loading: true,
        error: false,
      };
    }
    case "GET_ISSUE_SUCCESS": {
      return {
        loading: false,
        error: false,
        issues: action.payload,
      };
    }
    case "GET_ISSUE_FAIL": {
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
