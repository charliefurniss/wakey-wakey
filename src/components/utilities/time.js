export function getTimeSinceReported(timeOfReport) {
  const timeOfReportInMilliseconds = new Date(timeOfReport);
  const timeSinceReportInSeconds = Math.floor(
    (new Date() - timeOfReportInMilliseconds) / 1000
  );
  const timeSinceReportInHours = Math.floor(timeSinceReportInSeconds / 3600);
  const timeSinceReportInMinutes = Math.floor(timeSinceReportInSeconds / 60);

  if (timeSinceReportInHours > 1) {
    return timeSinceReportInHours + ' hours';
  }
  if (timeSinceReportInMinutes > 1) {
    return timeSinceReportInMinutes + ' mins';
  }
  return Math.floor(timeSinceReportInSeconds) + ' seconds';
}
