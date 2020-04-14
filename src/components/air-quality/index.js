import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

import DashboardWidget from './../common/dashboard-widget';
import { warningColours } from '../utilities/warning-colours';

const GET_AIR_QUALITY = gql`
  query GetAirQuality {
    airQuality {
      band
      summary
    }
  }
`;

const AirQuality = () => {
  const { loading, error, data } = useQuery(GET_AIR_QUALITY);

  if (loading) return <div className='mdl-spinner mdl-js-spinner is-active' />;
  if (error) return <h1>Error</h1>;
  return (
    <DashboardWidget
      heading={'Pollution'}
      warning={data.airQuality.band}
      details={data.airQuality.summary}
      warningColour={colourSet[data.airQuality.band]}
    />
  );
};

const colourSet = {
  Low: warningColours.low,
  Moderate: warningColours.moderate,
  High: warningColours.high,
  'Very High': warningColours.veryHigh,
};

export default AirQuality;
