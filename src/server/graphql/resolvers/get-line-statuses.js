const fetch = require('node-fetch');

const getLineStatuses = async () => {
  const result = await fetch(
    'https://api.tfl.gov.uk/line/london-overground,victoria/status'
  );
  const lineStatuses = await result.json();

  // Note need to sort the status.lineStatuses by severity code
  return lineStatuses.map(status => {
    const statusToReport = status.lineStatuses[0];
    return {
      lineName: status.name,
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
