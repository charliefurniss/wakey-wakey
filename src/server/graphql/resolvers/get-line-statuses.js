const fetch = require('node-fetch');

const getLineStatuses = async () => {
  const result = await fetch(
    'https://api.tfl.gov.uk/line/london-overground,circle/status'
  );
  const lineStatuses = await result.json();

  return lineStatuses.map(status => {
    return { reason: status.lineStatuses[0].reason };
  });
};

module.exports = getLineStatuses;
