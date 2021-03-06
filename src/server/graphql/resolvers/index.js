const getAirQuality = require('./get-air-quality');
const getLineStatuses = require('./get-line-statuses');
const getLines = require('./get-lines');
const getPollenCount = require('./get-pollen-count');
const getWeatherForecast = require('./get-weather-forecast');

const resolvers = {
  airQuality: async () => await getAirQuality(),
  lineStatuses: async lineIds => await getLineStatuses(lineIds),
  lines: async () => await getLines(),
  pollenCount: async () => await getPollenCount(),
  weatherForecast: async () => await getWeatherForecast()
};

module.exports = resolvers;
