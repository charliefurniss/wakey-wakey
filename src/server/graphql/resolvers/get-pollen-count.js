const fetch = require('node-fetch');

const getPollenCount = async () => {
  const result = await fetch(
    'https://socialpollencount.co.uk/api/forecast?location=[51.7546407,0.0014544000000569213]'
  );

  return {
    status_code: 'hello'
  };
};

module.exports = getPollenCount;
