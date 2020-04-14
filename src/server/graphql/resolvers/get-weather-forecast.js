const fetch = require('node-fetch');

const formatTemperature = temperature => {
  return `${Math.round(temperature)}°C`;
};

const upperCaseString = string => {
  return string.charAt(0) + string.substring(1).toLowerCase();
};

const getWeatherForecast = async () => {
  const result = await fetch(
    'https://api.darksky.net/forecast/4d8025fc49a9eb9cb31c4d55c5ba3c66/51.7546407,0.0014544000000569213?units=uk2'
  );

  const weatherForecastData = await result.json();

  const current = weatherForecastData.currently;
  const today = weatherForecastData.daily.data[0];

  return {
    forecastNow: {
      temperature: formatTemperature(current.temperature),
      feelsLike: formatTemperature(current.apparentTemperature),
      summary: upperCaseString(current.summary),
      icon: current.icon
    },
    forecastToday: {
      temperatureHigh: formatTemperature(today.temperatureHigh),
      temperatureLow: formatTemperature(today.temperatureLow),
      feelsLike: formatTemperature(today.apparentTemperature),
      summary: upperCaseString(today.summary),
      icon: today.icon
    }
  };
};

module.exports = getWeatherForecast;
