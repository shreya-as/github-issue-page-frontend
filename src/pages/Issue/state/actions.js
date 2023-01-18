import { issuePageConstants } from "./constants";
// get issue request
export const getIssuesRequest = () => ({
  type: issuePageConstants.GET_ISSUE_REQUEST,
});
// get issue success
export const getIssueSuccess = (data) => ({
  type: issuePageConstants.GET_ISSUE_SUCCESS,
  payload: data,
});
// get issue fail
export const getIssueFail = () => ({
  type: issuePageConstants.GET_ISSUE_FAIL,
});
// update page
export const updateCurrentPage = (data) => ({
  type: issuePageConstants.UPDATE_CURRENT_PAGE,
  payload: data,
});
// update query
export const updateQuery = (data) => ({
  type: issuePageConstants.UPDATE_QUERY,
  payload: data,
});
