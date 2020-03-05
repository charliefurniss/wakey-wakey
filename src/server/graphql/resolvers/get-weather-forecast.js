const fetch = require('node-fetch');

const getWeatherForecast = async () => {
  const result = await fetch(
    'https://api.darksky.net/forecast/4d8025fc49a9eb9cb31c4d55c5ba3c66/51.7546407,0.0014544000000569213?units=uk2'
  );

  const weatherForecastData = await result.json();
  const current = weatherForecastData.currently;
  const today = weatherForecastData.daily.data[0];

  return {
    forecastNow: {
      temperature: current.temperature,
      feelsLike: current.apparentTemperature,
      summary: current.summary,
      icon: current.icon
    },
    forecastToday: {
      temperatureHigh: today.temperatureHigh,
      temperatureLow: today.temperatureLow,
      feelsLike: today.apparentTemperature,
      summary: today.summary,
      icon: today.icon
    }
  };
};

module.exports = getWeatherForecast;
