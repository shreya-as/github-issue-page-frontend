// calculate time
export const getIssueCreatedTime = (date) => {
  // create a new Date object from the input date
  const updatedDate = new Date(date).getTime();

  // get the current date
  const currentDate = new Date().getTime();

  // Calculate the time in milliseconds
  const timeDiff = currentDate - updatedDate;

  // Calculate the number of hours, days, weeks, and months that have passed
  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
  const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
  const options = { month: "short", day: "numeric", year: "numeric" }; //specifies the format of the date.
  return minutes === 0
    ? `now.`
    : minutes < 60
    ? `${minutes} minute${minutes === 1 ? "" : "s"} ago`
    : hours < 24
    ? `${hours} hour${hours === 1 ? "" : "s"} ago`
    : days < 7
    ? days === 1
      ? "yesterday"
      : `${days} days ago`
    : weeks < 4
    ? weeks === 1
      ? "last week"
      : ` ${weeks} weeks ago`
    : months === 1
    ? "last month"
    : `on ${new Date(date).toLocaleDateString("en-US", options)}`;
};
