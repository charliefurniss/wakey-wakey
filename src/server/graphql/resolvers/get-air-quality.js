const fetch = require('node-fetch');

const getAirQuality = async () => {
  const result = await fetch('https://api.tfl.gov.uk/airquality');
  const airQualityData = await result.json();

  return {
    band: airQualityData.currentForecast[0].forecastBand,
    summary: airQualityData.currentForecast[0].forecastSummary
  };
};

module.exports = getAirQuality;
