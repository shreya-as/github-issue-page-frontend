// calculate time
export const getIssueCreatedTime = (date) => {
  // Create a new Date object from the input date
  const updatedDate = new Date(date);
  console.log(date, "date");
  // Get the current date
  const currentDate = new Date();

  // Calculate the elapsed time in milliseconds
  const elapsedTime = currentDate - updatedDate;

  // Calculate the number of hours, days, weeks, and months that have passed
  const elapsedMinutes = Math.floor(elapsedTime / (1000 * 60));
  const elapsedHours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const elapsedDays = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
  const elapsedWeeks = Math.floor(elapsedTime / (1000 * 60 * 60 * 24 * 7));
  const elapsedMonths = Math.floor(elapsedTime / (1000 * 60 * 60 * 24 * 30));
  console.log(elapsedWeeks, "elapsedWeeks");
  return elapsedTime < 0
    ? `now.`
    : elapsedMinutes < 60
    ? `${elapsedMinutes} minute${elapsedMinutes === 1 ? "" : "s"}ago`
    : elapsedHours < 24
    ? `${elapsedHours} hour${elapsedHours === 1 ? "" : "s"} ago`
    : elapsedDays < 7
    ? elapsedDays === 1
      ? "yesterday"
      : `${elapsedDays} days ago`
    : elapsedWeeks < 4
    ? elapsedWeeks === 1
      ? "last week"
      : ` ${elapsedWeeks} weeks ago`
    : elapsedMonths === 1
    ? "last month"
    : `on ${updatedDate.toLocaleDateString()}`;
};
