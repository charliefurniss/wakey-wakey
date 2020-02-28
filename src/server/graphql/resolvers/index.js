const getAirQuality = require('./get-air-quality');
const getLineStatuses = require('./get-line-statuses');

const resolvers = {
  airQuality: async () => await getAirQuality(),
  lineStatuses: async () => await getLineStatuses()
};

module.exports = resolvers;
