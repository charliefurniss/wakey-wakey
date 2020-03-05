const getAirQuality = require('./get-air-quality');
const getLineStatuses = require('./get-line-statuses');
const getPollenCount = require('./get-pollen-count');
const getWeatherForecast = require('./get-weather-forecast');

const resolvers = {
  airQuality: async () => await getAirQuality(),
  lineStatuses: async () => await getLineStatuses(),
  pollenCount: async () => await getPollenCount(),
  weatherForecast: async () => getWeatherForecast()
};

module.exports = resolvers;
