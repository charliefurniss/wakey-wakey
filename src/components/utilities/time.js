export function getTimeSinceReported(timeOfReport) {
  console.log(timeOfReport);
  const timeOfReportInMilliseconds = getDateInMilliseconds(timeOfReport);
  const timeNowInMilliseconds = getDateInMilliseconds();

  // console.log(timeOfReportInMilliseconds);
  // console.log(timeNowInMilliseconds);

  console.log(timeNowInMilliseconds - timeOfReportInMilliseconds);

  const timeSinceReportInSeconds = Math.floor(
    (timeNowInMilliseconds - timeOfReportInMilliseconds) / 1000
  );

  const timeSinceReportInHours = Math.floor(timeSinceReportInSeconds / 3600);
  const timeSinceReportInMinutes = Math.floor(timeSinceReportInSeconds / 60);

  console.log('seconds', timeSinceReportInSeconds);
  console.log('mins', timeSinceReportInMinutes);
  console.log('hours', timeSinceReportInHours);

  if (timeSinceReportInHours > 1) {
    return timeSinceReportInHours + ' hours';
  }
  if (timeSinceReportInMinutes > 1) {
    return timeSinceReportInMinutes + ' mins';
  }
  return Math.floor(timeSinceReportInSeconds) + ' seconds';
}

function getDateInMilliseconds(date) {
  const dateAsUTC = date ? new Date(date) : new Date();

  console.log(dateAsUTC);

  return dateAsUTC.getTime();
}
