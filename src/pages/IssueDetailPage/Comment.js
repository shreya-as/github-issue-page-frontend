import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
const Comment = ({ issueDetails }) => {
  return (
    <div className="comment__container">
      <div className="avatar">
        <img src={issueDetails?.user?.avatar_url} alt="Avatar" loading="lazy" />
      </div>
      <div className="comment__section">
        <div className="comment__header">
          <strong>{issueDetails?.user?.login}</strong>
          {/* <span>{issueDetails?.user?.login}</span> */}
        </div>

        <div className="comment__body">
          <ReactMarkdown remarkPlugins={[gfm]}>
            {issueDetails?.body?.replace(/<!--[\s\S]*?-->/g, "")}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default memo(Comment);
