const fetch = require('node-fetch');

const getLineStatuses = async ({ lineIds }) => {
  const result = await fetch(`https://api.tfl.gov.uk/line/${lineIds}/status`);
  const lineStatuses = await result.json();

  // TODO: return the relevant status from status.lineStatuses after sorting by the severity code
  return lineStatuses.map(status => {
    const statusToReport = status.lineStatuses[0];
    return {
      name: status.name,
      reason: statusToReport.reason || null,
      severity: statusToReport.statusSeverity,
      description:
        statusToReport.statusSeverity < 10
          ? statusToReport.statusSeverityDescription
          : 'Good service'
    };
  });
};

module.exports = getLineStatuses;
