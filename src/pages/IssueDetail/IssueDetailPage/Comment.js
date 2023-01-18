import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { getIssueCreatedTime } from "../../../AppUtils/AppFunctions/dateFunctions";
const Comment = ({ issueDetails }) => {
  return (
    <div className="comment__container">
      <div className="avatar">
        <img src={issueDetails?.user?.avatar_url} alt="Avatar" loading="lazy" />
      </div>
      <div className="comment__section">
        <div className="comment__header">
          <strong className="issue__author">{issueDetails?.user?.login}</strong>
          <span>{`commented ${getIssueCreatedTime(
            issueDetails?.created_at
          )}`}</span>
        </div>

        <div className="comment__body">
          <ReactMarkdown remarkPlugins={[gfm]}>
            {/* remove comment from body */}
            {issueDetails?.body?.replace(/<!--[\s\S]*?-->/g, "")}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default memo(Comment);
