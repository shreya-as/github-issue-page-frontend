import React, { memo } from "react";
import { TbCircleDot } from "react-icons/tb";
import { Link } from "react-router-dom";
import { getIssueCreatedTime } from "../../AppUtils/AppFunctions/dateFunctions";

const IssuePageListing = ({ issues }) => {
  // color for array for styling
  const labelColor = ["b60205", "9149d1"];
  return (
    <>
      {issues?.map((issue) => {
        const {
          id,
          title,
          labels,
          number,
          created_at,
          comments,
          user: { login },
        } = issue;
        return (
          <div className="issue__details" key={id}>
            <TbCircleDot className="issue__svg" />
            <div>
              <div className="title__container">
                {/* navigate to issues detail page */}
                <Link to={`issues/${number}`}>
                  <h1 className="issue__title">{title}</h1>
                </Link>
                {/* display labels */}
                {labels?.map((label) => {
                  return (
                    <span
                      key={label?.id}
                      className="issue__status"
                      style={{
                        backgroundColor: `#${label?.color}`,
                        color: `${
                          labelColor?.includes(label?.color) ? "white" : "black"
                        }`,
                      }}
                    >
                      {label?.name}
                    </span>
                  );
                })}
              </div>

              <div className="issue__data">
                <span className="issue__number">{`#${number}`}</span>
                <span className="issue__author">
                  opened {getIssueCreatedTime(created_at)} by {login}
                </span>
              </div>
              <div className="issue__comment">
                <span>Comments: {comments}</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default memo(IssuePageListing);