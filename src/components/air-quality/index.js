import React, { useState, useEffect } from 'react';

import DashboardWidget from './../common/dashboard-widget';
import { warningColours } from '../utilities/warning-colours';

function AirQuality() {
  const [isLoading, setIsLoading] = useState(true);
  const [airQuality, setAirQuality] = useState([]);
  const [forecastBand, setForecastBand] = useState('Low');
  const [error, setError] = useState({});

  useEffect(() => {
    fetch('https://api.tfl.gov.uk/airquality')
      .then(response => response.json())
      .then(data => {
        setAirQuality(data);
        setForecastBand(data.currentForecast[0].forecastBand);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  });

  return (
    <>
      {!isLoading &&
      airQuality.currentForecast &&
      airQuality.currentForecast.length ? (
        <DashboardWidget
          heading={'Air quality'}
          warning={forecastBand}
          details={airQuality.currentForecast[0].forecastText}
          warningColour={colourSet[forecastBand]}
        />
      ) : (
        <div class='mdl-spinner mdl-js-spinner is-active' />
      )}
    </>
  );
}

const colourSet = {
  Low: warningColours.low,
  Moderate: warningColours.moderate,
  High: warningColours.high,
  'Very High': warningColours.veryHigh
};

export default AirQuality;
