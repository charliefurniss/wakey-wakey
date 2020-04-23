import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

import { SunshineIcon } from './icons';

import DashboardWidget from './../common/dashboard-widget';
import { colours } from '../utilities/core-colours';

const GET_WEATHER_FORECAST = gql`
  query GetWeatherForecast {
    weatherForecast {
      forecastNow {
        temperature
        summary
        feelsLike
        icon
      }
      forecastToday {
        temperatureHigh
        temperatureLow
        summary
        icon
      }
    }
  }
`;

const WeatherForecast = () => {
  const { loading, error, data } = useQuery(GET_WEATHER_FORECAST);

  if (loading) return <div className='mdl-spinner mdl-js-spinner is-active' />;
  if (error) return <h1>{error}</h1>;

  const forecastNow = data.weatherForecast.forecastNow;
  return (
    <DashboardWidget
      heading={'Weather'}
      numeric={forecastNow.temperature}
      details={'data.forecastNow.summary'}
      warningColour={colourSet[forecastNow.icon].background}
      warningTextColour={
        colourSet[forecastNow.icon].text || colours.primaryText
      }
      icon={<SunshineIcon />}
    />
  );
};

const colourSet = {
  'clear-day': { background: colours.yellow, text: colours.secondaryText },
  'clear-night': { background: colours.purple },
  rain: { background: colours.darkGrey },
  snow: { background: colours.white, text: colours.secondaryText },
  sleet: { background: colours.lightGrey, text: colours.secondaryText },
  wind: { background: colours.darkGrey },
  fog: { background: colours.darkGrey },
  cloudy: { background: colours.lightGrey, text: colours.secondaryText },
  'partly-cloudy-day': {
    background: colours.lightGrey,
    text: colours.secondaryText,
  },
  'partly-cloudy-night': {
    background: colours.lightGrey,
    text: colours.secondaryText,
  },
};

export default WeatherForecast;
