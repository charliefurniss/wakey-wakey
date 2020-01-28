const fetch = require('node-fetch');

const getAirQuality = async () => {
  const result = await fetch('https://api.tfl.gov.uk/airquality');
  const airQualityData = await result.json();

  const forecast = {
    band: airQualityData.currentForecast[0].forecastBand,
    summary: airQualityData.currentForecast[0].forecastSummary
  };

  return forecast;
};

module.exports = getAirQuality;
