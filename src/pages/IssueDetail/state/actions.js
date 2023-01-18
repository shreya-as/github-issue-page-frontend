import { issueDetailsConstants } from "./constants";
// get issue request
export const getIssueDetailsRequest = () => ({
  type: issueDetailsConstants.GET_ISSUE_DETAILS_REQUEST,
});
// get issue success
export const getIssueDetailSuccess = (data) => ({
  type: issueDetailsConstants.GET_ISSUE_DETAILS_SUCCESS,
  payload: data,
});
// get issue fail
export const getIssueDetailsFail = () => ({
  type: issueDetailsConstants.GET_ISSUE_DETAILS_FAIL,
});
