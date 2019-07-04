import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import DashboardWidget from './../common/dashboard-widget';

const GREEN = '#4caf50';
const AMBER = '#ff9800';
const RED = '#ff5722';
const PURPLE = '#673ab7';

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
      {error ? <p>{error.message}</p> : null}
      {!isLoading &&
      airQuality.currentForecast &&
      airQuality.currentForecast.length ? (
        <Card className='mdl-card'>
          <DashboardWidget
            heading={'Air quality'}
            indicator={forecastBand}
            details={airQuality.currentForecast[0].forecastText}
            indicatorColour={colourSet[forecastBand]}
          />
        </Card>
      ) : (
        <div class='mdl-spinner mdl-js-spinner is-active' />
      )}
    </>
  );
}

const Card = styled.div`
  text-align: left;
`;

const colourSet = {
  Low: GREEN,
  Moderate: AMBER,
  High: RED,
  'Very High': PURPLE
};

export default AirQuality;
